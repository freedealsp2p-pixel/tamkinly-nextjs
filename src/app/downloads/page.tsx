'use client';

import { Download, FileText, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    name: "Executive Manual",
    file: "/Executive-Manual.pdf",
    description: "دليل تشغيلي لنظام Identity Recode - المنهجية، القواعد، ومسار الـ 30 يوم",
    pages: 6,
    size: "74 KB"
  },
  {
    name: "Identity Baseline Worksheet",
    file: "/Identity-Baseline-Worksheet.pdf",
    description: "ورقة عمل لقياس حالة الهوية الحالية عبر 8 أبعاد رئيسية",
    pages: 12,
    size: "75 KB"
  },
  {
    name: "Environmental Audit",
    file: "/Environmental-Audit.pdf",
    description: "تدقيق البيئة لتحديد العوامل الداعمة والمعيقة للتحول",
    pages: 8,
    size: "62 KB"
  },
  {
    name: "Decision Pattern Analysis",
    file: "/Decision-Pattern-Analysis.pdf",
    description: "تحليل أنماط القرار لكشف التحيزات المتكررة",
    pages: 7,
    size: "58 KB"
  },
  {
    name: "Evidence Tracking System",
    file: "/Evidence-Tracking-System.pdf",
    description: "نظام تتبع الأدلة السلوكية لإثبات التغيير",
    pages: 8,
    size: "60 KB"
  },
  {
    name: "Progress Dashboard Guide",
    file: "/Progress-Dashboard-Guide.pdf",
    description: "دليل لوحة المتابعة لعرض التقدم عبر الوقت",
    pages: 7,
    size: "58 KB"
  }
];

export default function DownloadsPage() {
  const totalSize = "387 KB";
  const totalPages = 48;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border-[#3DD4B0]/30">
            <HardDrive className="w-4 h-4 mr-2" />
            Tamkinly Products
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            Identity Recode Planner
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            نظام تحويل الهوية على مدار 30 يوم - 6 مستندات للتحميل
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-[#3DD4B0] font-bold">{products.length}</span>
              <span className="text-slate-400 text-sm ml-2">ملفات</span>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-[#3DD4B0] font-bold">{totalPages}</span>
              <span className="text-slate-400 text-sm ml-2">صفحة</span>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-[#3DD4B0] font-bold">{totalSize}</span>
              <span className="text-slate-400 text-sm ml-2">الحجم الكلي</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="bg-white/5 border-white/10 hover:border-[#3DD4B0]/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3DD4B0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {product.name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-3" dir="rtl">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{product.pages} صفحات</span>
                      <span>•</span>
                      <span>{product.size}</span>
                    </div>
                  </div>
                </div>
                
                <a href={product.file} download className="mt-4 block">
                  <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    تحميل الملف
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Download All */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-4">
            اضغط على كل زر لتحميل الملف بشكل منفصل
          </p>
        </div>
      </div>
    </div>
  );
}
