import React, { useState } from 'react';
import menuData from './menu.json';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const orderSummary = cart.reduce((summary, item) => {
    const key = item.name;
    const existing = summary[key];

    if (existing) {
      existing.qty += 1;
      existing.total += item.price;
    } else {
      summary[key] = { ...item, qty: 1, total: item.price };
    }

    return summary;
  }, {});

  const orderItems = Object.values(orderSummary);
  const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <h1 className="text-xl font-bold">KenGen Hydro Plaza Resto</h1>
      </nav>

      <main className="p-6 space-y-6">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-6">
            {Object.entries(menuData).map(([sectionTitle, items]) => (
              <div key={sectionTitle} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">{sectionTitle}</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {items.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => addToCart(item)}
                      className="rounded-xl border border-gray-200 bg-slate-50 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-600">KSH {item.price.toFixed(2)}</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Tap to add to order</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Current Order</h2>
            {orderItems.length === 0 ? (
              <p className="text-gray-600">No items selected yet. Tap any menu item to add it here.</p>
            ) : (
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.name} className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-600">x{item.qty}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                      <span>Unit: KSH {item.price.toFixed(2)}</span>
                      <span>Total: KSH {item.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl border-t border-gray-200 pt-4 text-right text-lg font-semibold text-gray-900">
                  Total: KSH {orderTotal.toFixed(2)}
                </div>
              </div>
            )}
          </aside>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full bg-white p-2 text-center text-xs text-gray-400">
        &copy; 2026 KenGen Restaurant System
      </footer>
    </div>
  );
}

export default App;
