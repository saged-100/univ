const days = ["Saturday","Sunday","Monday","Tuesday"];
schedule.forEach((x,i)=>x.id=i);

function render(){
  const root = document.getElementById("days");
  root.innerHTML = "";

  days.forEach((day, dayIndex) => {
    const xs = schedule.filter(x => x.day === day);
    const s = document.createElement("section");
    s.className = "day reveal";
    s.style.transitionDelay = (dayIndex * 90) + "ms";

    s.innerHTML = `
      <div class="dayhead">
        <div>
          <h3>${day}</h3>
          <small>${xs.length} sessions · ${xs[0].start} → ${xs[xs.length-1].end}</small>
        </div>
        <span class="bus">🚌 Bus ${buses[day]}</span>
      </div>
      <div class="wrap">
        <table>
          <thead>
            <tr>
              <th>Time</th><th>Course</th><th>Type</th><th>Group</th>
              <th>Subgroup</th><th>Room</th><th>Instructor(s)</th>
            </tr>
          </thead>
          <tbody>
            ${xs.map((x,i)=>`
              <tr class="row-${x.type.toLowerCase()}" style="--row-delay:${i*70}ms">
                <td><b>${x.start}–${x.end}</b></td>
                <td class="course">${x.course}</td>
                <td><span class="type ${x.type.toLowerCase()}">${x.type}</span></td>
                <td class="badge">${x.group}</td>
                <td class="badge">${x.subgroup}</td>
                <td>${x.room}</td>
                <td>${x.instructors || "—"}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
    root.appendChild(s);
  });
}
render();

/* scroll reveal */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

/* stagger rows */
const rowObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll("tbody tr").forEach((tr,i)=>{
        setTimeout(()=>tr.classList.add("row-in"), i*70);
      });
      rowObs.unobserve(e.target);
    }
  });
},{threshold:0.08});
document.querySelectorAll(".day").forEach(d=>rowObs.observe(d));