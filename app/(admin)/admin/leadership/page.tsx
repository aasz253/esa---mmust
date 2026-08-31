import { prisma } from "@/lib/prisma";
import { createLeader, deleteLeader } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";

export default async function AdminLeadershipPage() {
  const leaders = await prisma.leader.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">Leadership</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">Add Leader</h3>
          <ServerActionForm
            action={createLeader}
            submitLabel="Add Leader"
            className="mt-4 space-y-3"
          >
            <Input label="Full name" name="name" required />
            <Input label="Position" name="position" required />
            <Input label="Programme" name="programme" />
            <Input label="Year" name="year" />
            <Input label="Photo URL" name="photo" placeholder="/images/leader-chairperson.jpg" />
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Bio</span>
              <textarea
                name="bio"
                rows={3}
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
          </ServerActionForm>
        </div>

        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
            {leaders.length} Leaders
          </h3>
          {leaders.length > 0 ? (
            <ul className="mt-3 max-h-[560px] space-y-2 overflow-y-auto">
              {leaders.map((l) => (
                <li
                  key={l.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3"
                >
                  <div className="flex items-center gap-3">
                    {l.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={l.photo}
                        alt={l.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-[#0f2a4a]">{l.name}</p>
                      <p className="text-xs text-[#6b84a8]">{l.position}</p>
                    </div>
                  </div>
                  <form action={deleteLeader}>
                    <input type="hidden" name="id" value={l.id} />
                    <button className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/25">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[#6b84a8]">No leaders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-[#4d6a92]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
      />
    </label>
  );
}
