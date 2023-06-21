// תפיסת אלמנטים מהדף
const board = document.querySelector("#note_board");
const content = document.querySelector("#noteTxt");
const time = document.querySelector("#noteTime");
const date = document.querySelector("#noteDate");
const btn = document.querySelector("#addNote");
const search_value = document.querySelector("#search_value");


// פונקציה שמביאה מידע של הפתקים מהשרת
async function notes_data() {
  
  try {

    const response = await fetch("http://localhost:4000/notes/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    let data = await response.json();
    console.log(data.notes);
    
    let notes = data.notes;

    // פונקציה שמקבלת אובייקט ובונה ממנו פתק בדף
const addNoteToHtml = async (note_obj) => {
  let new_textarea;
  let new_time;
  let new_date;

  // יצירת האלמנטים והשמת ערך לאלמנטים
  const note_div = document.createElement("div");
  note_div.classList.add("note");

  const para_content = document.createElement("p");
  para_content.innerHTML = note_obj.content;

  para_content.addEventListener("click", () => {
    new_textarea = document.createElement("textarea");
    new_textarea.style.maxWidth = "70%";
    new_textarea.append(para_content.innerHTML);
    note_div.replaceChild(new_textarea, para_content);

    const update_btn = document.createElement("button");
    update_btn.append("UPDATE");
    note_div.replaceChild(update_btn, delete_btn);

    update_btn.addEventListener("click", async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/notes/update/${note_obj._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: new_textarea.value }),
          }
        );
        
        if (!response.ok) {
          throw new Error("Failed to update note.");
        }
      } catch (error) {
        console.error(error);
      }
      location.reload(); 
    });
  });

  const para_time = document.createElement("p");
  para_time.innerHTML = note_obj.time;

  para_time.addEventListener("click", () => {
    new_time = document.createElement("input");
    new_time.setAttribute("type", "time");
    new_time.value = para_time.innerHTML;
    new_time.style.maxWidth = "50%";
    note_div.replaceChild(new_time, para_time);

    const update_btn = document.createElement("button");
    update_btn.append("UPDATE");
    note_div.replaceChild(update_btn, delete_btn);

    update_btn.addEventListener("click", async () => {
        try {
            const response = await fetch(
              `http://localhost:4000/notes/update/${note_obj._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ time: new_time.value }),
              }
            );
    
            if (!response.ok) {
              throw new Error("Failed to update note.");
            }
          } catch (error) {
            console.error(error);
          }
          location.reload(); 
    });
  });

  const para_date = document.createElement("p");
  para_date.innerHTML = note_obj.date;

  para_date.addEventListener("click", () => {
    new_date = document.createElement("input");
    new_date.setAttribute("type", "date");
    new_date.style = "max-width: 70%; margin-bottom: 20px";
    new_date.value = para_date.innerHTML;
    note_div.replaceChild(new_date, para_date);

    const update_btn = document.createElement("button");
    update_btn.append("UPDATE");
    note_div.replaceChild(update_btn, delete_btn);

    update_btn.addEventListener("click", async () => {
      
        try {
            const response = await fetch(
              `http://localhost:4000/notes/update/${note_obj._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: new_.value }),
              }
            );
    
            if (!response.ok) {
              throw new Error("Failed to update note.");
            }
          } catch (error) {
            console.error(error);
          }
         location.reload(); 
    });
  });
  const delete_btn = document.createElement("button");
  delete_btn.innerHTML = "DELETE";

  // האזנה לקליק על כפתור מחיקה
  delete_btn.addEventListener("click", async () => {
   
        try {
            const response = await fetch(
              `http://localhost:4000/notes/delete/${note_obj._id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              }
            );
    
            if (!response.ok) {
              throw new Error("Failed to delete note.");
            }
          } catch (error) {
            console.error(error);
          }
          location.reload();
          
    });

  // הטמעת כל האלמנטים שיוצרים את הפתק בדיב של הפתק
  note_div.append(para_content, para_time, para_date, delete_btn);

  // הטמעת הפתק בלוח בדף
  board.append(note_div);
    
  
};

// מאזין לאירוע קליק של הוספת פתק
btn.addEventListener("click", async () => {
  try {
    try {
      const response = await fetch("http://localhost:4000/notes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.value,
          time: time.value,
          date: date.value,
        }),
      });
      data = await response.json();
      
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}

  // מאפס את השדות קלט
  content.value = "";
  time.value = "";
  date.value = "";
  location.reload();
});

// לולאה שרצה בסריפט הגלובלי שבונה מכל איבר במערך של הפתקים פתק בדף
for (let eivar of notes) {
  addNoteToHtml(eivar);
}

// האזנה לאירוע הקלדת ערך בשורת חיפוש
search_value.addEventListener("keyup", () => {
  // יצירת מערך חדש מסונן שמתאים למה שיש בערך של השורת חיפוש
  // לפי תוכן או זמן או תאריך
  const filtered_array = notes.filter(
    (note) =>
      note.content.includes(search_value.value) ||
      note.time.includes(search_value.value) ||
      note.date.includes(search_value.value)
  );

  // מאפס את הלוח בדף
  board.innerHTML = "";

  // במידה והמערך מכיל איברים זאת אומרת שיש התאמה לחיפוש
  if (filtered_array.length > 0) {
    // לולאה שרצה בסריפט הגלובלי שבונה מכל איבר במערך של הפתקים המסונן פתק בדף
    for (let note of filtered_array) {
      addNoteToHtml(note);
    }
  }

  // במידה והמערך ריק
  else {
    board.innerHTML = "לא נמצאו תוצאות";
  }
});



  } catch (error) {
    console.log(error);
  }
}

notes_data();




