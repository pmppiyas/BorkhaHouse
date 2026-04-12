import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const TrustPoint = () => {
  const featureList = [
    {
      icon: <Truck className="h-10 w-10 text-primary" strokeWidth={1.5} />,
      title: 'Free Shipping & Return',
      description: 'Free Shipping on all orders over $250',
    },
    {
      icon: <RotateCcw className="h-10 w-10 text-primary" strokeWidth={1.5} />,
      title: 'Money Back Return',
      description: '3 days money back guarantee',
    },
    {
      icon: (
        <ShieldCheck className="h-10 w-10 text-primary" strokeWidth={1.5} />
      ),
      title: 'Cash On Delivery',
      description: 'Pay only when you receive your product at your doorstep.',
    },
    ,
    {
      icon: <Headphones className="h-10 w-10 text-primary" strokeWidth={1.5} />,
      title: 'Power Support',
      description: 'We support online 24/7 on day',
    },
  ];

  return (
    <section className="w-full border-y border-border/50 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featureList.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center space-y-4 text-center transition-transform hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="rounded-full bg-primary/5 p-3 transition-colors group-hover:bg-primary/10">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold tracking-tight text-foreground uppercase">
                  {item.title}
                </h3>
                <p className="mx-auto max-w-50 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustPoint;
