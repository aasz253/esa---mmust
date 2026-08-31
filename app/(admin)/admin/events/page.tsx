import { prisma } from "@/lib/prisma";
import { createEvent, deleteEvent } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";
import { ImageUpload } from "@/components/ImageUpload";
import { formatDate } from "@/lib/utils";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: { registrations: true },
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">Events</h2>
      <p className="mt-1 text-sm text-[#5b7394]">
        Create events — new/featured events appear at the top of the public
        calendar automatically.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
            Create Event
          </h3>
          <ServerActionForm
            action={createEvent}
            submitLabel="Create Event"
            className="mt-4 space-y-3"
          >
            <Input name="title" label="Event title" placeholder="Engineering Weekend" required />
            <Input name="category" label="Category" placeholder="Engineering Weekend" />
            <Input name="date" label="Date" type="date" required />
            <Input name="startTime" label="Start time" placeholder="10:00 AM" />
            <Input name="endTime" label="End time" placeholder="4:00 PM" />
            <Input name="venue" label="Venue" placeholder="MMUST Main Campus" />
            <ImageUpload name="coverImage" label="Cover image (from device)" />
            <Input name="organizer" label="Organizer" placeholder="ESA MMUST" />
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Description</span>
              <textarea
                name="description"
                rows={3}
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-[#4d6a92]">
              <input type="checkbox" name="featured" className="accent-[#3aa0ff]" />
              Featured
            </label>
          </ServerActionForm>
        </div>

        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
            {events.length} Events
          </h3>
          {events.length > 0 ? (
            <ul className="mt-3 max-h-[560px] space-y-2 overflow-y-auto">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[#0f2a4a]">{e.title}</p>
                    <p className="text-xs text-[#6b84a8]">
                      {formatDate(e.date)} · {e.venue} · {e.registrations.length} regs
                    </p>
                  </div>
                  <form action={deleteEvent}>
                    <input type="hidden" name="id" value={e.id} />
                    <button className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/25">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[#6b84a8]">No events yet.</p>
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
