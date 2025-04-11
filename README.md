# Marginal Tax Calculator

An interactive educational tool that helps users understand how marginal tax rates work in the U.S. federal income tax system. This calculator demonstrates why the common myth "earning more can lead to less take-home pay" is false.

## Features

- **Interactive Tax Calculator**: Input your income and see how it's taxed across different brackets
- **Visual Tax Distribution**: See how your income is distributed across tax brackets with visual progress bars
- **Key Tax Metrics**:
  - Total Tax Owed
  - Take-Home Pay
  - Effective Tax Rate
  - Marginal Tax Rate
- **Educational Content**:
  - Explanation of common tax myths
  - Clear examples of how marginal tax rates work
  - Visual breakdown of tax distribution
  - Comparison of marginal vs. effective tax rates

## How It Works

1. Enter your annual income using the input field or the +/- $1,000 buttons
2. View your tax breakdown across different brackets
3. See how each portion of your income is taxed at different rates
4. Understand why moving to a higher tax bracket doesn't reduce your take-home pay

## Technical Details

- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- TypeScript for type safety
- Responsive design for both desktop and mobile

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/marginal-tax.git
cd marginal-tax
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
marginal-tax/
├── src/
│   ├── lib/
│   │   ├── calculateTax.ts    # Tax calculation logic
│   │   └── taxBrackets.ts     # Tax bracket definitions
│   └── routes/
│       └── +page.svelte       # Main calculator interface
├── static/
└── package.json
```

## Limitations

This calculator is designed for educational purposes and has some limitations:

- Only calculates federal income tax
- Does not include:
  - Standard or itemized deductions
  - Tax credits
  - State and local taxes
  - Social Security and Medicare taxes
  - Capital gains taxes
  - Alternative Minimum Tax (AMT)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tax bracket data sourced from the IRS
- Inspired by the need to educate people about how marginal tax rates actually work
