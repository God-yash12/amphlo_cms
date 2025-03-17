import { useRef, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, Textarea } from "@material-tailwind/react";
import PrimaryButton from "../../../ui/buttons/primary-button";
import InputField from "../../../ui/input/input";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { UseFAQService } from "../../services/feature/faqs-service";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BeatLoader } from "react-spinners";

const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
};

export const FeatureFAQs = () => {
    const { form, onSubmit, faqs, isLoading, isError, deleteFAQ, updateFAQ, mutation } = UseFAQService();
    const [open, setOpen] = useState<number | null>(null);
    const [editingFAQ, setEditingFAQ] = useState<{ id: number, question: string, answer: string } | null>(null);
    const formRef = useRef<HTMLDivElement>(null)

    const scrollTOForm = () => {
        if(formRef.current){
            formRef.current.scrollIntoView({behavior: "smooth", block: "start"})
        }
    }

    const handleOpen = (value: number) => setOpen(open === value ? null : value);
    const {
        formState: { errors },
    } = form;

    const handleEditClick = (faq: { id: number; question: string; answer: string }) => {
        setEditingFAQ(faq);
        form.setValue("question", faq.question);
        form.setValue("answer", faq.answer);
    };

    const handleFormSubmit = (data: { question: string; answer: string }) => {
        if (editingFAQ) {
            updateFAQ({ id: editingFAQ.id, ...data });
            setEditingFAQ(null);
            form.reset()
        } else {
            onSubmit(data);
        }
    };

    return (
        <div ref={formRef} className=" container  py-8">
            {/* Page Title Section */}
            <div className="text-center mb-8">
                <Header className="text-gray-800 text-3xl font-extrabold">
                    {editingFAQ ? "Update FAQ" : "Feature FAQs Section"}
                </Header>
                {!editingFAQ && (
                    <Paragraph className="text-gray-600 mt-2">
                        Customize the FAQ section of your website with ease.
                    </Paragraph>
                )}
            </div>

            {/* Form Section */}
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="rounded-xl shadow-lg p-8 space-y-8">
                <div className="space-y-5 mb-4">
                    <InputField label="FAQ Question *" {...form.register("question")} />
                    {errors.question && <ErrorMessage>{errors.question.message}</ErrorMessage>}
                    {/* @ts-ignore */}
                    <Textarea
                        label="FAQ Answer *"
                        variant="outlined"
                        {...form.register("answer")}
                    />
                    {errors.answer && <ErrorMessage>{errors.answer.message}</ErrorMessage>}
                </div>
                <PrimaryButton type="submit">{mutation.isPending ? <div><BeatLoader /></div> : editingFAQ ? "Update FAQ" : "Submit"} </PrimaryButton>

            </form>

            <section className="my-12 px-4">
            <h2 className="text-gray-800 text-3xl font-extrabold mb-6 text-center">FAQs</h2>

            {isLoading && <p className="text-center">Loading FAQs...</p>}
            {isError && <p className="text-red-500 text-center">Error fetching FAQs. Please try again later.</p>}

            <div className="space-y-4">
                {faqs?.map(({ id, question, answer }) => (
                    <div key={id} className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
                        <div className="flex-1">
                            {/* @ts-ignore */}
                            <Accordion open={open === id} animate={CUSTOM_ANIMATION}>
                                {/* @ts-ignore */}
                                <AccordionHeader onClick={() => handleOpen(id)} className="text-lg font-semibold">
                                    {question}
                                </AccordionHeader>
                                <AccordionBody className="text-gray-600">{answer}</AccordionBody>
                            </Accordion>
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex gap-4 text-xl ml-4">
                            <button
                                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                                onClick={() => {handleEditClick({ id, question, answer }), scrollTOForm()}}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                                onClick={() => deleteFAQ(id)}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        </div>
    );
};
