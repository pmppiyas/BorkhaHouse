export default function AdminMainPageContent() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '৳ 2,45,000',
      change: '+12.5%',
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
    },
    {
      title: 'Pending Orders',
      value: '32',
      change: '-2.1%',
    },
    {
      title: 'Low Stock Products',
      value: '14',
      change: '+4.3%',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-1024',
      customer: 'Ayesha Rahman',
      amount: '৳ 4,500',
      status: 'Delivered',
    },
    {
      id: '#ORD-1025',
      customer: 'Fatema Noor',
      amount: '৳ 3,200',
      status: 'Pending',
    },
    {
      id: '#ORD-1026',
      customer: 'Nusrat Jahan',
      amount: '৳ 5,100',
      status: 'Processing',
    },
    {
      id: '#ORD-1027',
      customer: 'Mim Akter',
      amount: '৳ 2,900',
      status: 'Delivered',
    },
  ];

  const topProducts = [
    {
      name: 'Premium Saudi Abaya',
      sold: 120,
      revenue: '৳ 1,20,000',
    },
    {
      name: 'Dubai Style Borkha',
      sold: 88,
      revenue: '৳ 84,000',
    },
    {
      name: 'Luxury Nidha Abaya',
      sold: 65,
      revenue: '৳ 72,000',
    },
  ];

  const lowStock = [
    {
      name: 'Black Stone Work Abaya',
      stock: 2,
    },
    {
      name: 'Classic Saudi Borkha',
      stock: 1,
    },
    {
      name: 'Premium Hijab Set',
      stock: 4,
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-7xl space-y-8">


        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-zinc-500">
                {item.title}
              </p>

              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-3xl font-bold text-zinc-900">
                  {item.value}
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Revenue Chart */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Revenue Analytics
                </h2>
                <p className="text-sm text-zinc-500">
                  Monthly sales overview
                </p>
              </div>

              <select className="rounded-xl border border-zinc-200 px-4 py-2 text-sm outline-none">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>

            <div className="flex h-[320px] items-end gap-4 rounded-2xl bg-zinc-100 p-6">
              {[45, 70, 55, 90, 60, 120, 95, 110, 85, 130, 100, 150].map(
                (height, idx) => (
                  <div
                    key={idx}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t-xl bg-black transition-all hover:opacity-80"
                      style={{ height: `${height * 2}px` }}
                    />

                    <span className="text-xs text-zinc-500">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Order Overview */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-4">
            <h2 className="text-xl font-bold text-zinc-900">
              Order Overview
            </h2>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-[22px] border-black">
                <div className="absolute h-40 w-40 rounded-full border-[18px] border-zinc-300" />

                <div className="text-center">
                  <p className="text-4xl font-bold">82%</p>
                  <p className="text-sm text-zinc-500">
                    Delivered
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-4 py-3">
                <span>Pending</span>
                <span className="font-semibold">32</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-4 py-3">
                <span>Processing</span>
                <span className="font-semibold">18</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-4 py-3">
                <span>Delivered</span>
                <span className="font-semibold">1,020</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Recent Orders */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-900">
                Recent Orders
              </h2>

              <button className="text-sm font-medium text-zinc-500 hover:text-black">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-sm text-zinc-500">
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="rounded-2xl bg-zinc-50"
                    >
                      <td className="rounded-l-2xl px-4 py-4 font-semibold">
                        {order.id}
                      </td>

                      <td className="px-4 py-4">
                        {order.customer}
                      </td>

                      <td className="px-4 py-4 font-medium">
                        {order.amount}
                      </td>

                      <td className="rounded-r-2xl px-4 py-4">
                        <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Widgets */}
          <div className="space-y-6 xl:col-span-5">
            {/* Top Products */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-zinc-900">
                Top Selling Products
              </h2>

              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between rounded-2xl bg-zinc-100 p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-zinc-900">
                        {product.name}
                      </h3>

                      <p className="text-sm text-zinc-500">
                        Sold: {product.sold}
                      </p>
                    </div>

                    <span className="font-bold text-zinc-900">
                      {product.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-zinc-900">
                Low Stock Alert
              </h2>

              <div className="space-y-4">
                {lowStock.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-zinc-900">
                        {item.name}
                      </h3>

                      <p className="text-sm text-red-500">
                        Only {item.stock} left
                      </p>
                    </div>

                    <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
