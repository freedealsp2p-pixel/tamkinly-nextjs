"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";
import {
  User, Mail, Lock, Loader2, AlertCircle, CheckCircle2, ArrowRight,
  Key, Sparkles, LogOut, Package, Calendar, Shield, ExternalLink,
  Settings, Bell, CreditCard, FileText
} from "lucide-react";

type AuthMode = "login" | "register";

type UserData = {
  id: string;
  email: string;
  name?: string;
  role: string;
  accessTier?: string;
  accessCodes?: { code: string; productId: string; isUsed: boolean; createdAt: string; }[];
};

function AccountDashboard({ user, onLogout }: { user: UserData; onLogout: () => void }) {
  const t = useTranslations("accountPage");
  const { locale } = useLocale();

  const getProductLabel = (productId: string) => {
    const key = "productLabels." + productId;
    try {
      const label = t(key);
      if (label && !label.startsWith("productLabels.")) return label;
    } catch {}
    return productId;
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-14 h-14 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
                    <User className="w-7 h-7 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{user.name || t("welcomeBack")}</h1>
                    <p className="text-[#8A94A6] text-sm">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/apps">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    <ExternalLink className="w-4 h-4 mr-2" />{t("openApps")}
                  </Button>
                </Link>
                <Button className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] border-2 border-white/20" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />{t("signOut")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm"><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center"><Package className="w-6 h-6 text-[#3DD4B0]" /></div><div><p className="text-sm text-[#8A94A6]">{t("products")}</p><p className="text-2xl font-bold text-[#0F1C2E]">{user.accessCodes?.length || 0}</p></div></div></CardContent></Card>
            <Card className="border-0 shadow-sm"><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center"><Shield className="w-6 h-6 text-[#1F6F78]" /></div><div><p className="text-sm text-[#8A94A6]">{t("accountStatus")}</p><p className="text-2xl font-bold text-[#0F1C2E]">{t("active")}</p></div></div></CardContent></Card>
            <Card className="border-0 shadow-sm"><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-[#0F1C2E]/10 flex items-center justify-center"><Calendar className="w-6 h-6 text-[#0F1C2E]" /></div><div><p className="text-sm text-[#8A94A6]">{t("memberSince")}</p><p className="text-lg font-bold text-[#0F1C2E]">{t("today")}</p></div></div></CardContent></Card>
          </div>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-[#0F1C2E] flex items-center gap-2"><Key className="w-5 h-5 text-[#3DD4B0]" />{t("yourAccessCodes")}</CardTitle><CardDescription>{t("accessCodesDesc")}</CardDescription></CardHeader>
            <CardContent>
              {user.accessCodes && user.accessCodes.length > 0 ? (
                <div className="space-y-4">{user.accessCodes.map((code, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F6F8FA] border border-slate-200">
                    <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center"><FileText className="w-5 h-5 text-[#3DD4B0]" /></div><div><p className="font-semibold text-[#0F1C2E]">{getProductLabel(code.productId)}</p><p className="text-sm text-[#8A94A6] font-mono">{code.code}</p></div></div>
                    <div className="flex items-center gap-3"><Badge variant={code.isUsed ? "default" : "secondary"} className={code.isUsed ? "bg-[#3DD4B0] text-[#0F1C2E]" : ""}>{code.isUsed ? t("activated") : t("readyToUse")}</Badge><Link href="/apps"><Button size="sm" variant="outline">{t("access")}<ArrowRight className="w-4 h-4 ml-1" /></Button></Link></div>
                  </div>
                ))}</div>
              ) : (
                <div className="text-center py-8"><Package className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" /><p className="text-[#8A94A6] mb-4">{t("noProducts")}</p><Link href="/products"><Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">{t("browseProducts")}</Button></Link></div>
              )}
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-[#0F1C2E] flex items-center gap-2"><Settings className="w-5 h-5 text-[#1F6F78]" />{t("profileSettings")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium text-[#2B2E34]">{t("name")}</label><Input value={user.name || ""} placeholder={t("notSet")} disabled className="bg-slate-50" /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#2B2E34]">{t("emailLabel")}</label><Input value={user.email} disabled className="bg-slate-50" /></div>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" disabled><Bell className="w-4 h-4 mr-2" />{t("notificationSettings")}</Button>
                <Button variant="outline" disabled><CreditCard className="w-4 h-4 mr-2" />{t("paymentMethods")}</Button>
                <Button variant="outline" disabled><Lock className="w-4 h-4 mr-2" />{t("changePassword")}</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78]">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"><Sparkles className="w-6 h-6 text-[#3DD4B0]" /></div><div><h3 className="font-semibold text-white">{t("needHelp")}</h3><p className="text-sm text-[#8A94A6]">{t("supportTeamHere")}</p></div></div>
                <Link href="/contact"><Button className="bg-white text-[#0F1C2E] hover:bg-white/90">{t("contactSupport")}<ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AuthForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessCodeLoading, setAccessCodeLoading] = useState(false);
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null);
  const [accessCodeSuccess, setAccessCodeSuccess] = useState<string | null>(null);
  const t = useTranslations("accountPage");
  const { locale } = useLocale();

  const handleAccessCode = async () => {
    if (!accessCodeInput.trim()) return;
    setAccessCodeLoading(true);
    setAccessCodeError(null);
    setAccessCodeSuccess(null);
    try {
      const response = await fetch("/api/access/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: accessCodeInput.trim(), email }) });
      const data = await response.json();
      if (!response.ok) { setAccessCodeError(data.error || "Invalid code"); return; }
      setAccessCodeSuccess("Access granted!");
      const accessInfo = JSON.parse(localStorage.getItem("tamkinly_access") || "{}");
      accessInfo[accessCodeInput.trim()] = { tier: data.tier, productId: data.productId, activatedAt: new Date().toISOString() };
      localStorage.setItem("tamkinly_access", JSON.stringify(accessInfo));
      setAccessCodeInput("");
      setTimeout(() => onLoginSuccess(), 1500);
    } catch { setAccessCodeError("Network error"); }
    finally { setAccessCodeLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (mode === "register") {
        const registerResponse = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, name: name || undefined }) });
        const registerData = await registerResponse.json();
        if (!registerResponse.ok) { setError(registerData.error || t("somethingWentWrong")); return; }
      }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) { setError(t("somethingWentWrong")); return; }
      if (mode === "register") { setSuccess(t("accountCreated")); setTimeout(() => onLoginSuccess(), 1500); }
      else { onLoginSuccess(); }
    } catch { setError(t("networkError")); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] flex items-center justify-center p-4" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8"><Link href="/" className="inline-block"><h1 className="text-3xl font-bold text-white">Tamkinly</h1><p className="text-[#8A94A6] text-sm">{t("identityPlatform")}</p></Link></div>
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4"><User className="w-8 h-8 text-[#3DD4B0]" /></div>
            <CardTitle className="text-2xl text-[#0F1C2E]">{mode === "login" ? t("welcomeBackTitle") : t("createAccount")}</CardTitle>
            <CardDescription className="text-[#8A94A6]">{mode === "login" ? t("signInDesc") : t("registerDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
              <button type="button" onClick={() => { setMode("login"); setError(null); }} className={"flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all " + (mode === "login" ? "bg-white text-[#0F1C2E] shadow-sm" : "text-[#8A94A6] hover:text-[#0F1C2E]")}>{t("signIn")}</button>
              <button type="button" onClick={() => { setMode("register"); setError(null); }} className={"flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all " + (mode === "register" ? "bg-white text-[#0F1C2E] shadow-sm" : "text-[#8A94A6] hover:text-[#0F1C2E]")}>{t("register")}</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg"><AlertCircle className="w-4 h-4 flex-shrink-0" />{error}</div>}
              {success && <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg"><CheckCircle2 className="w-4 h-4 flex-shrink-0" />{success}</div>}
              {mode === "register" && <div className="space-y-2"><label className="text-sm font-medium text-[#2B2E34]">{t("nameOptional")}</label><Input type="text" placeholder={t("yourName")} value={name} onChange={(e) => setName(e.target.value)} className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" /></div>}
              <div className="space-y-2"><label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2"><Mail className="w-4 h-4" />{t("emailAddress")}</label><Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2"><Lock className="w-4 h-4" />{t("password")}</label><Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" /></div>
              <Button type="submit" disabled={loading || !email || !password} className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 font-semibold">
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{mode === "login" ? t("signingIn") : t("creatingAccount")}</> : <>{mode === "login" ? t("signIn") : t("createAccount")}<ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>
            <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-[#8A94A6]">{t("or")}</span></div></div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input type="text" placeholder="TMLY-XXXX-XXXX" value={accessCodeInput} onChange={(e) => setAccessCodeInput(e.target.value.toUpperCase())} className="flex-1 h-12 border-[#1F6F78]/30 focus:border-[#3DD4B0] font-mono text-center tracking-wider" maxLength={18} />
                <Button type="button" onClick={handleAccessCode} disabled={accessCodeLoading || !accessCodeInput.trim()} className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-6">{accessCodeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="w-4 h-4 mr-2" />}{t("activateCode")}</Button>
              </div>
              {accessCodeError && <p className="text-red-500 text-xs text-center">{accessCodeError}</p>}
              {accessCodeSuccess && <p className="text-green-600 text-xs text-center">{accessCodeSuccess}</p>}
              <p className="text-center text-xs text-[#8A94A6]">{t("enterCodeDesc")}</p>
            </div>
            {mode === "register" && (
              <div className="mt-6 p-4 bg-[#3DD4B0]/10 rounded-lg border border-[#3DD4B0]/30">
                <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-[#3DD4B0] mt-0.5" /><div><p className="text-sm font-medium text-[#0F1C2E]">{t("alreadyPurchased")}</p><p className="text-xs text-[#8A94A6] mt-1">{t("alreadyPurchasedDesc")}</p></div></div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="text-center mt-6"><p className="text-[#8A94A6] text-sm">{t("needHelpQ")}{" "}<Link href="/contact" className="text-[#3DD4B0] hover:underline">{t("contactSupport")}</Link></p></div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetch("/api/auth/me", { credentials: "include" })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.user) {
            setUserData({
              id: data.user.id, email: data.user.email, name: data.user.name,
              role: data.user.role, accessTier: data.user.accessTier,
              accessCodes: data.user.accessCodes || [],
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, session]);

  const handleLogout = async () => {
    localStorage.removeItem("tamkinly_user");
    localStorage.removeItem("tamkinly_access");
    await signOut({ callbackUrl: "/" });
  };

  const handleLoginSuccess = () => { router.refresh(); };

  if (loading) {
    return (<div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#3DD4B0]" /></div>);
  }

  if (status === "authenticated" && userData) {
    return <AccountDashboard user={userData} onLogout={handleLogout} />;
  }

  return <AuthForm onLoginSuccess={handleLoginSuccess} />;
}

