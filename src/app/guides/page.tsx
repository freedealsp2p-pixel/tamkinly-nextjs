'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Sparkles, BookOpen } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo";

const guides = [
  {
    slug: "identity-vs-behavior-change",
    title: "Identity vs Behavior Change: Why Willpower Fails",
    excerpt: "The hidden reason most self-improvement efforts don't last — and the identity-first approach that creates permanent transformation. Includes practical exercises.",
    category: "Identity Shift",
    readTime: "12 min read",
    featured: true,
  },
];

export default function GuidesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={[breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              <BookOpen className="w-3.5 h-3.5 mr-2" />
              Deep Dives
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Transformation <span className="text-accent">Guides</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Comprehensive, research-backed guides that go beyond surface-level tips. 
              Each guide walks you through a complete framework for lasting identity change.
            </p>
          </div>
        </div>
      </section>

      {/* Guides List Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1">
                  All Guides
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-primary">
                  Available Guides
                </h2>
              </div>
            </div>
            <p className="text-slate-600 max-w-2xl">
              Choose a guide and dive deep into the science and practice of identity transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card className={`h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  guide.featured ? 'ring-2 ring-accent/20' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs text-[#1F6F78] border-[#1F6F78]/30">
                        {guide.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </span>
                      <span className="text-accent text-sm flex items-center gap-1">
                        Read Guide <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="text-accent">Identity</span>?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              These guides are just the beginning. Start your structured transformation journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apps">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Try Free Apps
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="white" size="lg" className="px-8 font-semibold">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
