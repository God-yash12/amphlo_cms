import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAxios } from "../../../../auth/home_auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const UseGalleryService = () => {
    const axiosPrivate = useAxios()
    const queryClient = useQueryClient()
    const form = useForm()

    const mutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosPrivate.post('galleries', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Gallery Images Saved  Successful")
        },
        onError: (error: any) => {
            toast.error(`Failed to Submit Gallery Images ${error.message}`)
        }
    })

    const onSubmit = (data: any) => {
        mutation.mutate(data)
    }

    const { data, isLoading } = useQuery({
        queryKey: ["galleries"],
        queryFn: async () => {
            const response = await axiosPrivate.get('galleries');
            return response;
        }
    })

    useEffect(() => {
        form.reset({
            galleryIds: data?.data.map((gallery: any) => gallery.id)
        })
    }, [data])


    const removeImageMutation = useMutation({
        mutationFn: async (fileId: number) => {
            const response = await axiosPrivate.delete(`file-upload/${fileId}`);
            return response;
        },
        onSuccess: () => {
            toast.success("Image removed from gallery successfully");
            queryClient.invalidateQueries({ queryKey: ['galleries'] });
        },
        onError: (error: any) => {
            toast.error(`Failed to remove image: ${error.message}`);
        },
    });


    const handleRemoveImage = (fileId: number) => {
        // console.log(`Attempting to delete image ${fileId} from gallery ${galleryId}`);
        // if (!galleryId) {
        //     console.error("Gallery ID is missing");
        //     toast.error("Cannot delete: Gallery ID is missing");
        //     return;
        // }
        // if (!fileId) {
        //     console.error("File ID is missing");
        //     toast.error("Cannot delete: File ID is missing");
        //     return; 
        // }
        removeImageMutation.mutate(fileId);
    };



    return { form, onSubmit, data, isLoading, mutation, handleRemoveImage, removeImageMutation }
}