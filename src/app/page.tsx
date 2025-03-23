"use client"
import Image from "next/image";

import { memo, useCallback, useMemo, useState } from "react";

// Function to calculate factorial
function factorial(n: number): number {
  console.log("Calculating factorial...");
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function FactorialMemo({num}: {num: number}){
  const result = useMemo(() => factorial(num), [num]);
  return <p>FactorialMemo: {result}</p>
}

export function FactorialCalculator() {
  const [number, setNumber] = useState(5);
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h2>Factorial Calculator</h2>
      <input
        className="text-black"
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
      />

      <FactorialMemo num={number}/>
      
      <button onClick={() => setCounter(counter + 1)}>Re-render ({counter})</button>
    </div>
  );
}

const Button = memo(({ onClick }: { onClick: () => void }) => {
  console.log("Button re-rendered");
  return <button onClick={onClick}>Click Me</button>;
})

export function CounterApp() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  },[]);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <Button onClick={handleClick} />
      <br></br>
      <button onClick={() => setCount(count + 1)}>Increment Counter</button>
    </div>
  );
}




export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <FactorialCalculator />
        <CounterApp />
      </main>
    </div>
  );
}
