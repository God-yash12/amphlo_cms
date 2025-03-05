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

export const Agent = () => {
    const { form, onSubmit, isLoading, mutation } = UseAgentService();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'process',
    })

    if (isLoading) return <PropagateLoader className="text-center" />

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl font-bold text-gray-900 mb-4">
                        Agent Proces Management
                    </Header>
                    <Paragraph className="text-gray-600">
                        Customize and manage your website's Agent section
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className="mx-auto">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                    >
                        {/* Title Input Section */}
                        <div className="space-y-4">
                            <div className="relative">
                                <InputField
                                    label="Showcase Your Feature's Headline"
                                    placeholder="Enter a compelling title for your features section"
                                    className="w-full transition-all duration-200"
                                    size="lg"
                                    {...form.register("title")}
                                />
                                {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
                            </div>

                            {/* Description Editor Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Feature Description
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
                        <section className="space-y-5">
                            <Header>Agent Process</Header>
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
                                        <SecondaryButton onClick={() => remove(index)} className="text-xl cursor-pointer"> Delete </SecondaryButton>
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
                        <div className="pt-6">

                            <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
