// import { create_our_services } from "@/api/apiClient";
// import { useMutation } from "@tanstack/react-query";

// export const create_our_services_mutation = async (data: any) => {
//     const mutation = useMutation({
//         mutationFn: async (data: any) => {
//           const res = await create_our_services(data);
//           return res;
//         },
    
//         onSuccess: async (data) => {
//           await QueryClient.invalidateQueries({ queryKey: ['our_services', page, deBounceKey] });
//           await queryClient.refetchQueries({ queryKey: ['our_services', page, deBounceKey] });
//           toast.success(data.message);
//         },
//         onError: async (error: any) => {
//           toast.error(error?.response?.data?.message || 'An error occurred');
//         },
    
//       })
// }