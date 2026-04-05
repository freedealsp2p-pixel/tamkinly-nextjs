import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/progress - Get user's overall progress across all apps
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      // Return demo data for anonymous users
      return NextResponse.json({
        success: true,
        isDemo: true,
        progress: getDemoProgress(),
      });
    }

    // Get transformation journey
    let journey = await db.transformationJourney.findUnique({
      where: { userId },
    });

    if (!journey) {
      // Create journey for user
      journey = await db.transformationJourney.create({
        data: { userId },
      });
    }

    // Get app progress
    const appProgress = await db.appProgress.findMany({
      where: { userId },
    });

    // Get achievements
    const achievements = await db.userAchievement.findMany({
      where: { userId },
    });

    // Get habits stats
    const habits = await db.habit.findMany({
      where: { userId, isArchived: false },
      include: {
        completions: {
          where: {
            date: new Date().toISOString().split('T')[0],
          },
        },
      },
    });

    // Get goals stats
    const goals = await db.goal.findMany({
      where: { userId },
    });

    // Get journal entries
    const journalEntries = await db.journalEntry.findMany({
      where: { userId },
    });

    // Get decision entries
    const decisionEntries = await db.decisionEntry.findMany({
      where: { userId },
    });

    // Get evidence records
    const evidenceRecords = await db.dailyEvidence.findMany({
      where: { userId },
    });

    // Calculate identity score
    const totalVotes = habits.reduce((acc, h) => acc + h.streak * 10, 0);
    const maxStreak = Math.max(...habits.map(h => h.streak), 0);
    const completedToday = habits.filter(h => h.completions.length > 0).length;
    const goalsCompleted = goals.filter(g => g.status === 'COMPLETED').length;
    const totalWords = journalEntries.reduce((acc, e) => acc + (e.content?.length || 0), 0);

    // Calculate journal streak
    let journalStreak = 0;
    const sortedEntries = [...journalEntries].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    let checkDate = new Date();
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      const diffDays = Math.floor((checkDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0 || diffDays === 1) {
        journalStreak++;
        checkDate = entryDate;
      } else break;
    }

    // Identity Score calculation
    const identityScore = Math.min(100, Math.round(
      (totalVotes * 0.1) +
      (maxStreak * 2) +
      (goalsCompleted * 5) +
      (journalStreak * 3) +
      (decisionEntries.length * 2) +
      (evidenceRecords.length * 1.5)
    ));

    // Update journey with latest stats
    await db.transformationJourney.update({
      where: { userId },
      data: {
        totalIdentityVotes: totalVotes,
        totalHabitsCompleted: habits.filter(h => h.completions.length > 0).length,
        totalGoalsCompleted: goalsCompleted,
        totalWordsWritten: totalWords,
        totalDecisionsLogged: decisionEntries.length,
        totalEvidenceRecords: evidenceRecords.length,
      },
    });

    // Get latest assessment results
    const identityBaseline = await db.identityBaselineResult.findFirst({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });

    const environmentalAudit = await db.environmentalAuditResult.findFirst({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });

    const erqResult = await db.eRQResult.findFirst({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });

    // Calculate phase
    const phase = identityScore < 30 ? 'AWARENESS' : identityScore < 60 ? 'RECODING' : 'INTEGRATION';

    return NextResponse.json({
      success: true,
      progress: {
        identityScore,
        phase,
        journey: {
          currentDay: journey.currentDay,
          currentPhase: journey.currentPhase,
          totalVotes,
          maxStreak,
          goalsCompleted,
          journalStreak,
          totalWords,
          decisionsLogged: decisionEntries.length,
          evidenceRecords: evidenceRecords.length,
        },
        apps: {
          habits: {
            total: habits.length,
            completedToday,
            streak: maxStreak,
          },
          goals: {
            total: goals.length,
            inProgress: goals.filter(g => g.status === 'IN_PROGRESS').length,
            completed: goalsCompleted,
          },
          journal: {
            entries: journalEntries.length,
            streak: journalStreak,
          },
          decisions: {
            entries: decisionEntries.length,
            avgQuality: decisionEntries.length > 0
              ? Math.round(decisionEntries.reduce((a, d) => a + d.overallQuality, 0) / decisionEntries.length)
              : 0,
          },
          evidence: {
            records: evidenceRecords.length,
            byType: getEvidenceByType(evidenceRecords),
          },
        },
        assessments: {
          identityBaseline: identityBaseline ? {
            overallScore: identityBaseline.overallScore,
            dimensions: {
              selfConcept: identityBaseline.selfConcept,
              valueCongruence: identityBaseline.valueCongruence,
              selfTrust: identityBaseline.selfTrust,
              commitmentConsistency: identityBaseline.commitmentConsistency,
              decisionQuality: identityBaseline.decisionQuality,
              emotionalRegulation: identityBaseline.emotionalRegulation,
              environmentalAlignment: identityBaseline.environmentalAlignment,
              personalAgency: identityBaseline.personalAgency,
            },
            completedAt: identityBaseline.completedAt,
          } : null,
          environmentalAudit: environmentalAudit ? {
            overallScore: environmentalAudit.overallScore,
            dimensions: {
              physicalSpace: environmentalAudit.physicalSpace,
              digitalEnvironment: environmentalAudit.digitalEnvironment,
              socialCircle: environmentalAudit.socialCircle,
              resourceAccess: environmentalAudit.resourceAccess,
              cueQuality: environmentalAudit.cueQuality,
            },
            completedAt: environmentalAudit.completedAt,
          } : null,
          erq: erqResult ? {
            reappraisalScore: erqResult.reappraisalScore,
            suppressionScore: erqResult.suppressionScore,
            completedAt: erqResult.completedAt,
          } : null,
        },
        achievements: achievements.map(a => ({
          id: a.achievementId,
          category: a.category,
          progress: a.progress,
          completed: a.completed,
          completedAt: a.completedAt,
        })),
        appProgress: appProgress.reduce((acc, p) => {
          acc[p.appSlug] = {
            score: p.score,
            progress: p.progressData,
            completed: p.completed,
            lastAccessed: p.lastAccessed,
            accessCount: p.accessCount,
          };
          return acc;
        }, {} as Record<string, unknown>),
      },
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST /api/progress - Update progress or save assessment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const body = await request.json();

    const { type, data } = body;

    // For anonymous users, just return success without saving
    if (!userId) {
      return NextResponse.json({
        success: true,
        message: 'Progress saved locally (demo mode)',
      });
    }

    switch (type) {
      case 'identity-baseline':
        const baselineResult = await db.identityBaselineResult.create({
          data: {
            userId,
            selfConcept: data.selfConcept || 50,
            valueCongruence: data.valueCongruence || 50,
            selfTrust: data.selfTrust || 50,
            commitmentConsistency: data.commitmentConsistency || 50,
            decisionQuality: data.decisionQuality || 50,
            emotionalRegulation: data.emotionalRegulation || 50,
            environmentalAlignment: data.environmentalAlignment || 50,
            personalAgency: data.personalAgency || 50,
            overallScore: data.overallScore || 50,
            reflections: JSON.stringify(data.reflections || {}),
            finalStatement: data.finalStatement,
          },
        });

        // Update transformation journey baseline
        await db.transformationJourney.upsert({
          where: { userId },
          create: {
            userId,
            baselineScores: JSON.stringify(data),
            journeyStartDate: new Date(),
          },
          update: {
            baselineScores: JSON.stringify(data),
          },
        });

        return NextResponse.json({ success: true, id: baselineResult.id });

      case 'environmental-audit':
        const auditResult = await db.environmentalAuditResult.create({
          data: {
            userId,
            physicalSpace: data.physicalSpace || 50,
            digitalEnvironment: data.digitalEnvironment || 50,
            socialCircle: data.socialCircle || 50,
            resourceAccess: data.resourceAccess || 50,
            cueQuality: data.cueQuality || 50,
            overallScore: data.overallScore || 50,
            frictionMap: JSON.stringify(data.frictionMap || {}),
            reflections: JSON.stringify(data.reflections || {}),
            finalStatement: data.finalStatement,
          },
        });
        return NextResponse.json({ success: true, id: auditResult.id });

      case 'erq':
        const erqResult = await db.eRQResult.create({
          data: {
            userId,
            reappraisalScore: data.reappraisalScore || 3.5,
            suppressionScore: data.suppressionScore || 3.5,
            responses: JSON.stringify(data.responses || []),
            interpretation: JSON.stringify(data.interpretation || {}),
          },
        });
        return NextResponse.json({ success: true, id: erqResult.id });

      case 'decision-entry':
        const decision = await db.decisionEntry.create({
          data: {
            userId,
            date: data.date || new Date().toISOString().split('T')[0],
            decision: data.decision,
            context: data.context,
            alternatives: data.alternatives,
            choice: data.choice,
            outcome: data.outcome,
            emotionState: data.emotionState,
            clarity: data.clarity || 50,
            emotionalStability: data.emotionalStability || 50,
            valueAlignment: data.valueAlignment || 50,
            futureUsefulness: data.futureUsefulness || 50,
            consequenceAwareness: data.consequenceAwareness || 50,
            consistencyScore: data.consistencyScore || 50,
            selfControl: data.selfControl || 50,
            overallQuality: data.overallQuality || 50,
            patternNoticed: data.patternNoticed,
            upgradeRule: data.upgradeRule,
            reflection: data.reflection,
          },
        });
        return NextResponse.json({ success: true, id: decision.id });

      case 'evidence':
        const evidence = await db.dailyEvidence.create({
          data: {
            userId,
            date: data.date || new Date().toISOString().split('T')[0],
            evidenceType: data.evidenceType,
            description: data.description,
            strengthScore: data.strengthScore || 5,
            sourceApp: data.sourceApp,
          },
        });
        return NextResponse.json({ success: true, id: evidence.id });

      case 'achievement':
        const achievement = await db.userAchievement.upsert({
          where: {
            userId_achievementId: {
              userId,
              achievementId: data.achievementId,
            },
          },
          create: {
            userId,
            achievementId: data.achievementId,
            category: data.category,
            tier: data.tier || 'FREE',
            progress: data.progress || 0,
            completed: data.completed || false,
            completedAt: data.completed ? new Date() : null,
            metadata: JSON.stringify(data.metadata || {}),
          },
          update: {
            progress: data.progress,
            completed: data.completed,
            completedAt: data.completed ? new Date() : null,
          },
        });
        return NextResponse.json({ success: true, id: achievement.id });

      case 'app-progress':
        const appProgress = await db.appProgress.upsert({
          where: {
            userId_appSlug: {
              userId,
              appSlug: data.appSlug,
            },
          },
          create: {
            userId,
            appSlug: data.appSlug,
            progressData: JSON.stringify(data.progressData || {}),
            score: data.score,
            completed: data.completed || false,
            timeSpent: data.timeSpent || 0,
          },
          update: {
            progressData: JSON.stringify(data.progressData || {}),
            score: data.score,
            completed: data.completed,
            timeSpent: { increment: data.timeSpent || 0 },
            lastAccessed: new Date(),
            accessCount: { increment: 1 },
          },
        });
        return NextResponse.json({ success: true, id: appProgress.id });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Progress POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}

// Helper functions
function getEvidenceByType(evidenceRecords: { evidenceType: string; strengthScore: number }[]) {
  const byType: Record<string, { count: number; avgStrength: number }> = {};
  
  for (const record of evidenceRecords) {
    if (!byType[record.evidenceType]) {
      byType[record.evidenceType] = { count: 0, avgStrength: 0 };
    }
    byType[record.evidenceType].count++;
    byType[record.evidenceType].avgStrength =
      (byType[record.evidenceType].avgStrength * (byType[record.evidenceType].count - 1) + record.strengthScore) /
      byType[record.evidenceType].count;
  }
  
  return byType;
}

function getDemoProgress() {
  return {
    identityScore: 35,
    phase: 'RECODING',
    journey: {
      currentDay: 7,
      currentPhase: 'AWARENESS',
      totalVotes: 50,
      maxStreak: 3,
      goalsCompleted: 0,
      journalStreak: 2,
      totalWords: 450,
      decisionsLogged: 3,
      evidenceRecords: 5,
    },
    apps: {
      habits: { total: 3, completedToday: 2, streak: 3 },
      goals: { total: 2, inProgress: 2, completed: 0 },
      journal: { entries: 5, streak: 2 },
      decisions: { entries: 3, avgQuality: 65 },
      evidence: { records: 5, byType: {} },
    },
    assessments: {
      identityBaseline: null,
      environmentalAudit: null,
      erq: null,
    },
    achievements: [],
    appProgress: {},
  };
}
