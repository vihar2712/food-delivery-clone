// async function hello() {
//   console.log("hello world");
//   const data = await fetch("https://api.github.com/users/vihar2712");
//   console.log(data);
//   const jsonData = await data.json();
//   console.log(jsonData);
// }
// hello();
// console.log("bye world");

// async function foo() {
//   const result1 = await new Promise((resolve) =>
//     setTimeout(() => resolve("1"), 5000)
//   );
//   console.log(result1);
//   const result2 = await new Promise((resolve) =>
//     setTimeout(() => resolve("2"), 3000)
//   );
//   console.log(result2);
// }
// foo();

const p1 = new Promise((resolve) => setTimeout(() => resolve("111111"), 5000));

const p2 = new Promise((resolve) => setTimeout(() => resolve("22222"), 3000));

async function foo2() {
  const result1 = await p1;
  console.log(result1);
  const result2 = await p2;
  console.log(result2);
}
foo2();
