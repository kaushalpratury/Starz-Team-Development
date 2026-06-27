import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/ui/page-layout";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <PageLayout>
      <Section className="w-full py-8 sm:py-10 lg:py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
          <div className="rounded-[2.25rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,255,255,0.98))] px-5 py-8 shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 text-center">
              <div className="w-full max-w-4xl">
                <BrandMark />
              </div>

              <div className="max-w-3xl space-y-3 sm:space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-600 sm:text-sm">
                  Stillwater Starz Team Development
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl lg:text-5xl">
                  Stillwater Starz Team Development
                </h1>
                <p className="text-base leading-7 text-slate-600 sm:text-lg">
                  Private Lesson Registration &amp; Management
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
                <Button className="w-full sm:w-auto sm:min-w-44">Sign In</Button>
                <Button variant="secondary" className="w-full sm:w-auto sm:min-w-44">
                  Create Parent Account
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:items-stretch">
            <Card className="flex h-full flex-col justify-between border-slate-200 bg-slate-50/85 p-6 shadow-none">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
                  Summer Private Lessons
                </p>
                <p className="mt-4 text-xl font-semibold leading-7 text-navy-800">
                  Lesson Time: 10:20 AM – 10:50 AM
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Private lesson scheduling for the summer season.
              </p>
            </Card>

            <Card className="flex h-full flex-col justify-between border-slate-200 bg-slate-50/85 p-6 shadow-none">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
                  Announcements
                </p>
                <p className="mt-4 text-xl font-semibold leading-7 text-navy-800">
                  Placeholder for current announcements
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Team updates and registration notices will appear here.
              </p>
            </Card>

            <Card className="flex h-full flex-col justify-between border-slate-200 bg-slate-50/85 p-6 shadow-none">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
                  Need Help?
                </p>
                <p className="mt-4 text-xl font-semibold leading-7 text-navy-800">
                  Contact Stillwater Starz
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Reach out by phone, text, or email for assistance.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
