import { Product } from "@/types";
import { supabase } from "@/utils/supabase/server";

const api = {
    async getCatalog() {
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (error) {
                throw new Error(`Error fetching item details: ${error.message}`);
            }
            if (!data) {
                throw new Error('Item not found');
            }
            return data as Product[];
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