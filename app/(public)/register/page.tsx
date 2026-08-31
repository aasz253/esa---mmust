import { PageHero } from "@/components/PageHero";
import { RegisterFlow } from "@/components/register/RegisterFlow";

export default function RegisterPage() {
  return (
    <>
      <PageHero
        tag="Join ESA"
        title="Become a Member"
        subtitle="Register as a first-year student or renew your membership as a continuing student."
        scene="register"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">
          <RegisterFlow />
        </div>
      </section>
    </>
  );
}
