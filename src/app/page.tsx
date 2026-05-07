import ClientHome from "@/components/client/ClientHome";
import { getCatalog } from "@/lib/supabase/api/server";
import type { Product } from "@/types";

const HomePage = async () => {
  const products = await getCatalog().catch((): Product[] => []);
  return <ClientHome products={products} />;
};

export default HomePage;