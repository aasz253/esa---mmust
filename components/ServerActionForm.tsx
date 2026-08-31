"use client";
import { useRef, useState, ReactNode, useTransition } from "react";

type ActionResult = { error?: string; success?: boolean };

export function ServerActionForm({
  action,
  submitLabel = "Submit",
  children,
  className,
  disabled,
}: {
  action: (formData: FormData) => Promise<ActionResult | void>;
  submitLabel?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<ActionResult | null>(null);
  const ref = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMsg(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result && "error" in result && result.error) {
        setMsg({ error: result.error });
      } else if (result && "success" in result && result.success) {
        setMsg({ success: true });
        ref.current?.reset();
      } else if (!result) {
        // action redirected
        return;
      }
    });
  }

  return (
    <form ref={ref} onSubmit={onSubmit} className={className} noValidate>
      {children}
      <button
        type="submit"
        disabled={pending || disabled}
        className="mt-4 w-full rounded-full bg-[#0047ab] py-3 font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4] disabled:opacity-50"
      >
        {pending ? "Submitting..." : submitLabel}
      </button>
      {msg?.success && (
        <p className="mt-3 rounded-xl bg-[#25D366]/15 p-3 text-center text-sm text-[#19b95b]">
          Submitted successfully. Thank you!
        </p>
      )}
      {msg?.error && (
        <p className="mt-3 rounded-xl bg-red-500/15 p-3 text-center text-sm text-red-400">
          {msg.error}
        </p>
      )}
    </form>
  );
}
