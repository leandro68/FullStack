const calculateBmi = (height: number, weight: number) => {
  const imc = weight / (height / 100) ** 2;

  switch (true) {
    case imc < 16:
      return "Underweight (Severe thinness)";
    case imc >= 16 && imc < 17:
      return "Underweight (Moderate thinness))";
    case imc >= 17 && imc < 18.5:
      return "Underweight (Mild thinness)";
    case imc >= 18.5 && imc < 25:
      return "Normal (healthy weight)";
    case imc >= 25 && imc < 30:
      return "Overweight (Pre-obese)";
    case imc >= 30 && imc < 35:
      return "Obese (Class I)";
    case imc >= 35 && imc < 40:
      return "Obese (Class II)";
    case imc >= 40:
      return "Obese (Class III)";
  }
  return imc;
};

console.log(calculateBmi(180, 74));
