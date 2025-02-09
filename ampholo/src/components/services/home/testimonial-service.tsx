import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TestimonialsValidation, TestimonialsValidationData } from "../../validations/home/testimonial-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { any } from "prop-types";

interface Testimonial {
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
    const axiosPrivate = UseAxiosPrivate();
    const queryClient = useQueryClient();
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null); // Add type to useState

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
            toast.success("Feedback submitted successfully");
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
            queryClient.invalidateQueries(["testimonials"]);
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
            toast.success("Testimonial updated successfully");
            queryClient.invalidateQueries(["testimonials"]);
        },
        onError: (error) => {
            toast.error(`Failed to update testimonial: ${error.message}`);
        }
    });

    const handleUpdate = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        form.setValue("personName", testimonial.personName);
        form.setValue("workPlace", testimonial.workPlace);
        form.setValue("feedback", testimonial.feedback);
        form.setValue("ratings", testimonial.ratings);
        form.setValue("image", testimonial.image?.id); 
    };

    const onSubmit = (data: TestimonialsValidationData) => {
        if (selectedTestimonial) {
            updateTestimonial.mutate({ id: selectedTestimonial.id, updatedData: data });
        } else {
            mutation.mutate(data);
        }
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
        setSelectedTestimonial,
        handleUpdate,
    };
};