import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { UseAgentService } from "../../services/feature/agent-service";
import { useFieldArray } from "react-hook-form";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { Textarea } from "@material-tailwind/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";

export const Agent = () => {
    const { form, onSubmit, isLoading, mutation } = UseAgentService();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'process',
    })

    if (isLoading) return <PropagateLoader className="text-center" />

    return (
        <div>
            <div className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                {/* Header Section */}
                <div className="col-span-1 max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl font-bold text-gray-900 text-left mb-4">
                        Agent Proces Management
                    </Header>
                    <Paragraph className="text-gray-600 text-left">
                        Customize and manage how agent can get connect with you, where title, description, and process how someone became agent with process number like 1, 2, 3, with title, and short description.
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className="col-span-2  bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=""
                    >
                        {/* Title Input Section */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm md:text-base text-gray-700 font-semibold">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <InputField
                                    label="Title *"
                                    placeholder="Enter a compelling title for your features section"
                                    className="w-full transition-all duration-200"
                                    size="lg"
                                    {...form.register("title")}
                                />
                                {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
                            </div>

                            {/* Description Editor Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Feature Description *
                                </label>
                                <TextEditor
                                    placeholder="Describe your key features in detail..."
                                    value={form.watch('description') ?? ''}
                                    onChange={(content) => {
                                        form.setValue("description", content);
                                    }}
                                />
                                {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}

                            </div>
                        </div>

                        {/* Agent Process */}
                        <section className="space-y-5 mt-5">
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base">Add how to became a Agent </h3>
                            {fields.map((field, index) => (
                                <div key={field.id} className="space-y-5">

                                    <InputField
                                        type="number"
                                        label='Process Number'
                                        placeholder="Process Number"
                                        {...form.register(`process.${index}.processNumber`, { valueAsNumber: true })}
                                    />
                                    <InputField
                                        label="Process Title"
                                        placeholder="Process Title"
                                        {...form.register(`process.${index}.processTitle`)}
                                    />
                                    {/* @ts-ignore */}
                                    <Textarea
                                        label="Process Description"
                                        placeholder="Process Description"
                                        {...form.register(`process.${index}.processDescription`)}
                                    />
                                    {fields.length > 1 && (
                                        <MdDelete onClick={() => remove(index)} className="text-xl cursor-pointer mb-10" />
                                    )}
                                </div>

                            ))}
                            {
                                fields.length < 5 && (
                                    <div>
                                        <SecondaryButton
                                            onClick={(e) => {
                                                e.preventDefault();
                                                append({ processNumber: 1, processTitle: '', processDescription: '' });
                                            }}
                                        >
                                            Add Agent Process
                                        </SecondaryButton>
                                    </div>
                                )
                            }
                        </section>
                        {/* Submit Button */}
                        <div className="pt-4 border-t flex justify-center">
                            <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
