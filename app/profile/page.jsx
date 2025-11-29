import CalendarHeatmap from "@/components/ui/calendarheatmap";
export default function Profile() {
  const data = [{ name: "Bilegdemberel",
    number:9926755
   }, {
    name:"Khongorzul"
   }];
   
  return (
    <main className="max-w-full min-h-full">
      <div>
    {data.map((item, index) => (
<h1 key={index} >Hello!!!{item.name}, {item.number}</h1>
        ))}
        
        <div>
          <CalendarHeatmap />
        </div>
      </div>
    </main>
  );
}
