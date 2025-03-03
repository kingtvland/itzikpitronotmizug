
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Star, Info, Tag, Truck, Clock } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useAnimation";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "אלקטרה INV Platinum 12",
    category: "air-conditioners",
    price: 2999,
    discountPrice: 2599,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631700611307-37dbcb89ef7e?auto=format&fit=crop&q=80&w=1080",
    tags: ["אינוורטר", "חסכוני", "שקט"],
    inStock: true,
    freeShipping: true,
    fastDelivery: true
  },
  {
    id: 2,
    name: "טורנדו Master 16",
    category: "air-conditioners",
    price: 3200,
    discountPrice: null,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1631700610794-0989b9703d71?auto=format&fit=crop&q=80&w=1080",
    tags: ["עוצמתי", "שקט"],
    inStock: true,
    freeShipping: true,
    fastDelivery: false
  },
  {
    id: 3,
    name: "סמסונג Wind-Free 15",
    category: "air-conditioners",
    price: 3500,
    discountPrice: 3200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1631700611585-c7a73922c477?auto=format&fit=crop&q=80&w=1080",
    tags: ["חדשני", "חסכוני", "שקט במיוחד"],
    inStock: false,
    freeShipping: true,
    fastDelivery: true
  },
  {
    id: 4,
    name: "שלט אוניברסלי למזגן",
    category: "accessories",
    price: 99,
    discountPrice: null,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1585790050230-5dd3d5554388?auto=format&fit=crop&q=80&w=1080",
    tags: ["תואם לכל המזגנים", "קל לתכנות"],
    inStock: true,
    freeShipping: false,
    fastDelivery: true
  },
  {
    id: 5,
    name: "מסנן אוויר מתקדם",
    category: "accessories",
    price: 149,
    discountPrice: 119,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1605794244319-0471d24066ea?auto=format&fit=crop&q=80&w=1080",
    tags: ["אנטי בקטריאלי", "נגד אלרגיות"],
    inStock: true,
    freeShipping: false,
    fastDelivery: true
  },
  {
    id: 6,
    name: "כיסוי חיצוני למזגן",
    category: "accessories",
    price: 199,
    discountPrice: 169,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1586380951230-e6703d9f6833?auto=format&fit=crop&q=80&w=1080",
    tags: ["עמיד במזג אוויר", "קל להתקנה"],
    inStock: true,
    freeShipping: true,
    fastDelivery: false
  },
];

const ShopSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.category === activeTab);
  
  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    toast.success(`${product.name} נוסף לסל הקניות`);
  };
  
  const handleToggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
      toast("הוסר מהמועדפים");
    } else {
      setFavorites(prev => [...prev, productId]);
      toast.success("נוסף למועדפים");
    }
  };
  
  return (
    <div 
      ref={elementRef}
      className={`transition-all duration-500 ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">חנות</h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="ml-2">סל קניות</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} dir="rtl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">הכל</TabsTrigger>
          <TabsTrigger value="air-conditioners">מזגנים</TabsTrigger>
          <TabsTrigger value="accessories">אביזרים</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  
                  <button
                    onClick={() => handleToggleFavorite(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors ${
                      favorites.includes(product.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500' : ''}`} />
                  </button>
                  
                  {product.discountPrice && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-white">מבצע</Badge>
                    </div>
                  )}
                  
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <Badge variant="outline" className="text-white border-white text-lg px-4 py-1">אזל מהמלאי</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{product.rating}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    {product.freeShipping && (
                      <span className="text-xs flex items-center gap-1 text-green-600">
                        <Truck className="h-3 w-3" />
                        משלוח חינם
                      </span>
                    )}
                    {product.fastDelivery && (
                      <span className="text-xs flex items-center gap-1 text-blue-600">
                        <Clock className="h-3 w-3" />
                        אספקה מהירה
                      </span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div>
                    {product.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">₪{product.discountPrice}</span>
                        <span className="text-sm text-muted-foreground line-through">₪{product.price}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">₪{product.price}</span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => product.inStock && handleAddToCart(product)}
                    className="btn-primary-effect"
                  >
                    הוסף לסל
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopSection;
