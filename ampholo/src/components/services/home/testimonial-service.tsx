import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../auth/home_auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TestimonialsValidation, TestimonialsValidationData } from "../../validations/home/testimonial-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


export interface Testimonial {
    id: number;
    personName: string;
    workPlace: string;
    feedback: string;
    ratings: number;
    createdAt: string;
    image: {
        id: number;
        url: string;
        filename: string;
        mimetype: string;
    };
}

export const UseTestimonialService = () => {
    const axiosPrivate = useAxios();
    const queryClient = useQueryClient();
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const [selectedImage, setSelectedImage] = useState<{
        id: number;
        url: string;
        filename: string;
      } | null>(null);

    const form = useForm<TestimonialsValidationData>({
        resolver: zodResolver(TestimonialsValidation)
    });

    const mutation = useMutation({
        mutationFn: async (data: TestimonialsValidationData) => {
            const response = await axiosPrivate.post('testimonials', data);
            return response;
        },
        onSuccess: () => {
            form.reset();
            setSelectedImage(null);
            toast.success("Feedback submitted successfully");
            queryClient.invalidateQueries({ queryKey: ['testimonials'] }); 
        },
        onError: (error) => {
            toast.error(`Please try Again Later!! ${error.message}`);
        }
    });

    const { data: testimonials, isLoading, isError, error } = useQuery<Testimonial[]>({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const response = await axiosPrivate.get('testimonials');
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await axiosPrivate.delete(`testimonials/${id}`);
        },
        onSuccess: () => {
            toast.success("Testimonials Deleted Successfully");
            queryClient.invalidateQueries({ queryKey: ['testimonials'] }); // Refetch after deletion
        },
        onError: (error) => {
            toast.error(`Failed to Delete Testimonial: ${error.message}`);
        }
    });

    const updateTestimonial = useMutation({
        mutationFn: async ({ id, updatedData }: { id: number; updatedData: TestimonialsValidationData }) => {
            const response = await axiosPrivate.patch(`testimonials/${id}`, updatedData);
            return response;
        },
        onSuccess: () => {
            form.reset();
            setSelectedImage(null);
            setSelectedTestimonial(null);
            toast.success("Testimonial updated successfully");
            queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        },
        onError: (error) => {
            toast.error(`Failed to update testimonial: ${error.message}`);
        }
    });

    const onSubmit = (data: TestimonialsValidationData) => {
        try {
            if (selectedTestimonial) {
                updateTestimonial.mutate({ id: selectedTestimonial.id, updatedData: data });
            } else {
                mutation.mutate(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     try {
    //         if (selectedTestimonial) {
    //             form.reset({
    //                 personName: selectedTestimonial.personName,
    //                 workPlace: selectedTestimonial.workPlace,
    //                 feedback: selectedTestimonial.feedback,
    //                 ratings: Number(selectedTestimonial.ratings),
    //                 imageId: selectedTestimonial?.image.id
    //             });
    //             if (selectedTestimonial.image) {
    //                 setSelectedImage(selectedTestimonial.image);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error resetting form:", error);
    //     }
    // }, [selectedTestimonial, form]);


    const handleDeleteClick = (testimonial: any) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this testimonial?");
        if (isConfirmed) {
            deleteMutation.mutate(testimonial.id);
        }
    };

    const handleSetSelectedTestimonial = (testimonial: Testimonial) => {
        // Set form values first
        form.reset({
            personName: testimonial.personName,
            workPlace: testimonial.workPlace,
            feedback: testimonial.feedback,
            ratings: Number(testimonial.ratings),
            imageId: testimonial.image?.id
        });
        
        if (testimonial.image) {
            setSelectedImage({
                id: testimonial.image.id,
                url: testimonial.image.url,
                filename: testimonial.image.filename
            });
        }else {
            // console.log("image render null")
            setSelectedImage(null); 
        }
        
        // Finally set the selected testimonial
        setSelectedTestimonial(testimonial);
    };

    return {
        form,
        onSubmit,
        testimonials,
        isLoading,
        isError,
        error,
        deleteMutation,
        selectedTestimonial,
        setSelectedTestimonial: handleSetSelectedTestimonial,
        updateTestimonial,
        mutation,
        handleDeleteClick,
        image: selectedTestimonial?.image,
        selectedImage,
        setSelectedImage,
    };
};
