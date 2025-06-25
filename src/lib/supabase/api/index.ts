import { Product } from "@/types";
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const api = {
    async getCatalog(): Promise<Product[]> {
        try {

            const { data: products, error } = await supabase
                .from('products')
                .select('*')
            if (error) {
                throw new Error(`Error fetching item details: ${error.message}`);
            }
            if (!products) {
                throw new Error('Item not found');
            }


            return products as Product[];
        } catch (error) {
            console.error('Error fetching catalog:', error);
            throw new Error(`Error fetching catalog: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    async getItemDetails(itemId: Pick<Product, 'id'>) {
        try {
            const { data, error } = await supabase.from('products').select('*').eq('id', itemId.id).single();
            if (error) {
                throw new Error(`Error fetching item details: ${error.message}`);
            }
            if (!data) {
                throw new Error('Item not found');
            }
            return data as Product;
        } catch (error) {
            console.error('Error fetching item details:', error);
            throw new Error(`Error fetching item details: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },
}

export default api;