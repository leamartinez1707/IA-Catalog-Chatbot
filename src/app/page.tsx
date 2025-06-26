import ClientHome from "@/components/client/ClientHome"
import api from "@/lib/supabase/api"

export const dynamic = 'force-dynamic';

const HomePage = async () => {

  const products = await api.getCatalog()
  return <ClientHome initialProducts={products} />
}

export default HomePage