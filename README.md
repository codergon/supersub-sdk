# Supersub SDK

Welcome to the Supersub SDK documentation. Supersub is a cross-chain crypto subscription platform powered by Alchemy's account abstraction infrastructure and Chainlink's Cross-Chain Interoperability Protocol. This SDK allows you to seamlessly integrate crypto-based subscriptions into your React applications.

## Demo

![Demo](shot.png?raw=true "Demo Image")

## Installation

Install the Supersub SDK using npm:

```bash
npm install supersub
```

Or using yarn:

```bash
yarn add supersub
```

## Setup

To integrate the Supersub SDK into your React application, follow these steps:

### 1. Wrap your application with `SuperSubProvider`

In your main entry file (usually `index.tsx`), import and set up the `SuperSubProvider` around your application component. This enables all child components to access the Supersub functionality via React context.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SuperSubProvider } from "supersub";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <SuperSubProvider>
      <App />
    </SuperSubProvider>
  </React.StrictMode>
);
```

### 2. Use the `useSuperSub` hook

In your components, utilize the `useSuperSub` hook to access the `openSubscription` method. This method triggers the subscription process.

```tsx
import { useSuperMeta } from "supersub";

function App() {
  const { openSubscription } = useSuperSub();

  return (
    <>
      <h1>Supersub Subscription Demo</h1>
      <div className="card">
        <button
          onClick={() =>
            openSubscription({
              productId: 10,
              defaultPlanId: 13,
              apiKey: "pk_your_api_key_here",
            })
          }
        >
          Pay with Supersub
        </button>
      </div>
    </>
  );
}

export default App;
```

## Configuration

Replace the `apiKey`, `productId`, and `defaultPlanId` with your actual product and plan identifiers and your Supersub API key to configure the subscription settings.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Your commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Show Your Support

Love using Supersub? You can show your support by starring the [repo](https://github.com/codergon/Supersub).

Don't forget to [follow me on twitter](https://twitter.com/thealpha_knight).

Thanks! - Kester A.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

---

Thank you for choosing Supersub ✨
