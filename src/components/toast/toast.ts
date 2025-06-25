import { toast } from "sonner";

export const showToast = {
  success: (text: string) => {
    toast.success(text, {
      duration: 3000,
      style: {
        backgroundColor: "#4CAF50",
        color: "#FFFFFF",
      },
    });
  },
  error: (text: string) => {
    toast.error(text, {
      duration: 3000,
      style: {
        backgroundColor: "#F44336",
        color: "#FFFFFF",
      },
    });
  },
  info: (text: string) => {
    toast.info(text, {
      duration: 3000,
      style: {
        backgroundColor: "#2196F3",
        color: "#FFFFFF",
      },
    });
  },
  warning: (text: string) => {
    toast.warning(text, {
      duration: 3000,
      style: {
        backgroundColor: "#FF9800",
        color: "#FFFFFF",
      },
    });
  },
}