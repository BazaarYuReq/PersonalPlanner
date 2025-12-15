import CalendarHeatmap from "@/components/ui/calendarheatmap";
import Link from "next/link";
export default function Profile() {
  const data = [
    { name: "Bilegdemberel", number: 9926755 },
    { name: "Khongorzul" },
  ];

  return (
    <main className="max-w-full min-h-full">
      <div>
        {data.map((item, index) => (
          <h1 key={index}>
            Hello!!!{item.name}, {item.number}
          </h1>
        ))}

        <div>
          <Link href="/">
            <button
              className="
    button-1 relative cursor-pointer bg-transparent p-0 border-none 
    outline-offset-[4px] transition-[filter] duration-250 select-none
  "
            >
              <span
                className="
      button-1-shadow absolute inset-0 rounded-[12px]
      bg-[hsl(0_0%_0%_/_0.25)]
      [transform:translateY(2px)]
      will-change-transform
    "
              ></span>

              <span
                className="
      button-1-edge absolute inset-0 rounded-[12px]
      bg-[linear-gradient(to_left,hsl(340_100%_16%)_0%,hsl(340_100%_32%)_8%,hsl(340_100%_32%)_92%,hsl(340_100%_16%)_100%)]
    "
              ></span>

              <span
                className="
      button-1-front relative block text-white rounded-[12px]
      bg-[hsl(345_100%_47%)]
      text-[1.1rem] px-[27px] py-[12px]
      will-change-transform
      [transform:translateY(-4px)]
      md:text-[1.25rem] md:px-[42px]
    "
              >
                THIS IS YOUR PROFILE
              </span>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
