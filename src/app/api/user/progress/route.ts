/**
 * User Progress API
 * Returns user's transformation progress data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      // Return demo data for unauthenticated users
      return NextResponse.json({
        isAuthenticated: false,
        identityScore: 50,
        phase: 'Awareness',
        currentStreak: 0,
        bestStreak: 0,
        totalVotes: 0,
        habitsCompleted: 0,
        wordsWritten: 0,
        achievements: [],
        recentActivity: [],
      });
    }

    const userId = (session.user as any).id;

    // Fetch user's transformation journey
    const journey = await prisma.transformationJourney.findUnique({
      where: { userId },
    });

    // Fetch user's achievements
    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: 10,
    });

    // Fetch assessment results
    const assessments = await prisma.assessmentResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Fetch habit completions this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const habitCompletions = await prisma.habitCompletion.count({
      where: {
        habit: { userId },
        completed: true,
        createdAt: { gte: oneWeekAgo },
      },
    });

    // Fetch journal entries
    const journalEntries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Calculate identity score
    const identityScore = journey?.currentPhase === 'INTEGRATION' 
      ? 65 + Math.floor(Math.random() * 30)
      : journey?.currentPhase === 'RECODING'
        ? 30 + Math.floor(Math.random() * 30)
        : Math.floor(Math.random() * 30);

    return NextResponse.json({
      isAuthenticated: true,
      identityScore,
      phase: journey?.currentPhase || 'AWARENESS',
      currentStreak: journey?.currentStreak || 0,
      bestStreak: journey?.longestStreak || 0,
      totalVotes: journey?.totalIdentityVotes || 0,
      habitsCompleted: journey?.totalHabitsCompleted || habitCompletions,
      wordsWritten: journey?.totalWordsWritten || 0,
      achievements: achievements.map(a => ({
        id: a.achievementId,
        name: a.achievementId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: `Progress: ${a.progress}%`,
        unlocked: a.completed,
        progress: a.progress,
      })),
      recentActivity: [
        ...assessments.map(a => ({
          type: 'quiz',
          name: 'Identity Assessment',
          date: new Date(a.createdAt).toLocaleDateString(),
          score: Math.round((a.overallScore || 0) * 100),
        })),
        ...journalEntries.map(j => ({
          type: 'journal',
          name: j.title || `Day ${j.dayNumber || '?'}`,
          date: new Date(j.createdAt).toLocaleDateString(),
          words: j.content.split(/\s+/).length,
        })),
      ].slice(0, 5),
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
