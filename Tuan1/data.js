async function getAPI() {
  const res = await fetch(
    "https://65d16bd9ab7beba3d5e455e6.mockapi.io/todolist/todo"
  );
  const data = await res.json();
  console.log(data);
}

getAPI();
