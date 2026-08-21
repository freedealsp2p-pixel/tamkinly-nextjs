"use client";

import { useState } from "react";
import { Copy, Check, Share2, Users, Gift, Award, Star, ExternalLink, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";

interface ReferralStats {
  totalInvites: number;
  completedReferrals: number;
  rewardsEarned: number;
  currentTier: "starter" | "growing" | "ambassador";
}

const TIER_CONFIG = {
  starter: { min: 0, max: 2, discount: 10, color: "#2A8A94", labelEn: "Starter", labelAr: "مبتدئ" },
  growing: { min: 3, max: 5, discount: 15, color: "#1F6F78", labelEn: "Growing", labelAr: "نامٍ" },
  ambassador: { min: 6, max: Infinity, discount: 20, color: "#3DD4B0", labelEn: "Ambassador", labelAr: "سفير" },
};

function getTier(completed: number): "starter" | "growing" | "ambassador" {
  if (completed >= 6) return "ambassador";
  if (completed >= 3) return "growing";
  return "starter";
}

export default function ReferralDashboard({ referralCode = "TMLY-XXXX-XXXX" }: { referralCode?: string }) {
  const t = useTranslations();
  const { direction, locale } = useLocale();
  const [copied, setCopied] = useState(false);
  const [stats] = useState<ReferralStats>({
    totalInvites: 0,
    completedReferrals: 0,
    rewardsEarned: 0,
    currentTier: "starter",
  });

  const tier = getTier(stats.completedReferrals);
  const tierConfig = TIER_CONFIG[tier];
  const referralLink = `https://tamkinly.com/ref/${referralCode}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareOnTwitter = () => {
    const text = locale === "ar"
      ? "اكتشف أدوات تحويل الهوية المبنية على العلم من تمكينلي"
      : "Discover science-backed identity transformation tools on Tamkinly";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const text = locale === "ar"
      ? `اكتشف أدوات تحويل الهوية من تمكينلي ${referralLink}`
      : `Discover science-backed identity tools on Tamkinly ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const nextTier = tier === "starter" ? "growing" : tier === "growing" ? "ambassador" : null;
  const nextTierConfig = nextTier ? TIER_CONFIG[nextTier] : null;
  const referralsToNext = nextTier ? (TIER_CONFIG[nextTier].min - stats.completedReferrals) : 0;

  return (
    <div className="space-y-6">
      {/* Tier Badge & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-[#0F1C2E] to-[#1A3350] border-white/10">
          <CardContent className="p-5 text-center">
            <Users className="w-8 h-8 text-[#3DD4B0] mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.totalInvites}</p>
            <p className="text-sm text-slate-400">
              {direction === "rtl" ? "إجمالي الدعوات" : "Total Invites"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#0F1C2E] to-[#1A3350] border-white/10">
          <CardContent className="p-5 text-center">
            <Award className="w-8 h-8 text-[#1F6F78] mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.completedReferrals}</p>
            <p className="text-sm text-slate-400">
              {direction === "rtl" ? "إحالات مكتملة" : "Completed Referrals"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#0F1C2E] to-[#1A3350] border-white/10">
          <CardContent className="p-5 text-center">
            <Gift className="w-8 h-8 text-[#7AEEE0] mx-auto mb-2" />
            <p className="text-3xl font-bold text-white">{stats.rewardsEarned}</p>
            <p className="text-sm text-slate-400">
              {direction === "rtl" ? "مكافآت محققة" : "Rewards Earned"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Tier & Progress */}
      <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#162B42] border-white/10 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${tierConfig.color}20` }}>
                <Star className="w-6 h-6" style={{ color: tierConfig.color }} />
              </div>
              <div>
                <p className="text-white font-semibold">
                  {direction === "rtl" ? tierConfig.labelAr : tierConfig.labelEn} {direction === "rtl" ? "مستوى" : "Tier"}
                </p>
                <p className="text-sm text-slate-400">
                  {tierConfig.discount}% {direction === "rtl" ? "خصم لكل إحالة" : "discount per referral"}
                </p>
              </div>
            </div>
            <Badge style={{ background: `${tierConfig.color}20`, color: tierConfig.color, border: `1px solid ${tierConfig.color}40` }}>
              {tierConfig.discount}% OFF
            </Badge>
          </div>

          {/* Next tier progress */}
          {nextTierConfig && (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>{direction === "rtl" ? `مستوى ${nextTierConfig.labelAr}` : `${nextTierConfig.labelEn} Tier`}</span>
                <span>{stats.completedReferrals}/{nextTierConfig.min} {direction === "rtl" ? "إحالات" : "referrals"}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (stats.completedReferrals / nextTierConfig.min) * 100)}%`,
                    background: `linear-gradient(90deg, ${tierConfig.color}, ${nextTierConfig.color})`,
                  }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {direction === "rtl"
                  ? `${referralsToNext} إحالات أخرى للانتقال للمستوى التالي`
                  : `${referralsToNext} more referrals to unlock ${nextTierConfig.labelEn} tier`}
              </p>
            </div>
          )}

          {!nextTierConfig && (
            <div className="p-3 bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 rounded-lg mt-2">
              <p className="text-sm text-[#3DD4B0] font-medium">
                {direction === "rtl" ? "🎉 وصلت أعلى مستوى! أنت سفير تمكينلي" : "🎉 You\'ve reached the top! You\'re a Tamkinly Ambassador"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Referral Link & Share */}
      <Card className="bg-gradient-to-br from-[#0F1C2E] via-[#162B42] to-[#1A3350] border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            {direction === "rtl" ? "شارك رابط الإحالة" : "Share Your Referral Link"}
          </h3>

          {/* Link with copy */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#3DD4B0] font-mono truncate">
              {referralLink}
            </div>
            <Button
              onClick={copyLink}
              className={`${copied ? "bg-[#3DD4B0] text-[#0F1C2E]" : "bg-[#1F6F78] text-white hover:bg-[#185c63]"} transition-all duration-300`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          {/* Share buttons */}
          <div className="flex gap-3">
            <Button onClick={shareOnTwitter} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <Share2 className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button onClick={shareOnWhatsApp} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 bg-[#25D366]/10 hover:bg-[#25D366]/20">
              <Share2 className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* How it works */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-sm font-medium text-white mb-3">
              {direction === "rtl" ? "كيف يعمل؟" : "How it works?"}
            </p>
            <div className="space-y-2">
              {[
                { step: "1", textEn: "Share your link with friends", textAr: "شارك رابطك مع أصدقائك" },
                { step: "2", textEn: "They get 10% off their purchase", textAr: "يحصلون على خصم ١٠٪" },
                { step: "3", textEn: "You earn rewards for each referral", textAr: "تكسب مكافآت لكل إحالة" },
              ].map(item => (
                <div key={item.step} className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="w-6 h-6 rounded-full bg-[#3DD4B0]/20 text-[#3DD4B0] text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  {direction === "rtl" ? item.textAr : item.textEn}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tier Comparison */}
      <Card className="bg-[#F6F8FA] border border-slate-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-[#0F1C2E] mb-4">
            {direction === "rtl" ? "مستويات المكافآت" : "Reward Tiers"}
          </h3>
          <div className="space-y-3">
            {Object.entries(TIER_CONFIG).map(([key, config]) => (
              <div key={key} className={`flex items-center justify-between p-3 rounded-lg ${tier === key ? "bg-white shadow-md ring-2" : "bg-white/50"}`} style={tier === key ? { ringColor: config.color } : {}}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${config.color}20` }}>
                    <Star className="w-4 h-4" style={{ color: config.color }} />
                  </div>
                  <span className="font-medium text-[#0F1C2E]">
                    {direction === "rtl" ? config.labelAr : config.labelEn}
                  </span>
                  <span className="text-xs text-slate-500">
                    {config.min === 0 ? (direction === "rtl" ? "١-٢ إحالات" : "1-2 referrals") : config.max === Infinity ? (direction === "rtl" ? "٦+ إحالات" : "6+ referrals") : `${config.min}-${config.max}`}
                  </span>
                </div>
                <Badge style={{ background: `${config.color}20`, color: config.color }}>
                  {config.discount}% OFF
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

