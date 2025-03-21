import InputField from "../../../ui/input/input"
import { TextEditor } from "../../../ui/editor/text-editor"
import Header from "../../../ui/typographs/header/header"
import Paragraph from "../../../ui/typographs/paragraph"
import { ErrorMessage } from "../../../ui/typographs/error-message"
import PrimaryButton from "../../../ui/buttons/primary-button"
import SecondaryButton from "../../../ui/buttons/secondary-button"
import { Textarea } from "@material-tailwind/react"
import { PortalAccessService } from "../../services/portal/portal-access-service"
import { BeatLoader, PropagateLoader } from "react-spinners"
import { MdDelete } from "react-icons/md";


export const PortalAccessProcess = () => {
    const { form, onSubmit, fields, append, remove, isLoading, isPending } = PortalAccessService()
    const errorMessage = form.formState.errors;

    if (isLoading) return <PropagateLoader className="text-center" />


    return (
        <div className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
            <div className="text-left col-span-1 mb-6">
                <Header className="text-2xl font-bold text-left text-gray-800">Portal Access Process</Header>
                <Paragraph className="text-gray-600 text-left">Customize the Portal Access Process section. How agent or university can access the portal. where all fields are required to submit.</Paragraph>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
                <div className="space-y-2">
                    <label className="block text-sm  text-gray-700 font-semibold">
                        Title  <span className="text-red-500">*</span>
                    </label>
                    <InputField
                        label="Title *"
                        placeholder="Title of Portal Access Porcess"
                        size="lg"
                        {...form.register("title")}
                        aria-invalid={errorMessage.title ? "true" : "false"}
                    />
                    {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}

                </div>
                <div className="w-auto space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Feature Description *
                    </label>
                    <TextEditor
                        value={form.watch("description") ?? ""}
                        onChange={(content) => {
                            form.setValue("description", content);
                        }}
                    />
                    {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}

                </div>

                {/* List Item Process */}
                <section className="space-y-5">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base mt-5">Add Portal Access Process</h3>

                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-5">
                            <InputField
                                type="number"
                                label="Process Count"
                                placeholder="Process Count"
                                {...form.register(`process.${index}.processCount`, { valueAsNumber: true })}
                            />
                            {errorMessage.process?.[index]?.processCount && (
                                <ErrorMessage>
                                    {errorMessage.process[index].processCount.message}
                                </ErrorMessage>
                            )}

                            <InputField
                                label="Process Title"
                                placeholder="Process Title"
                                {...form.register(`process.${index}.processTitle`)}
                            />
                            {errorMessage.process?.[index]?.processTitle && (
                                <ErrorMessage>
                                    {errorMessage.process[index].processTitle.message}
                                </ErrorMessage>
                            )}

                            {/* @ts-ignore */}
                            <Textarea
                                label="Process Description"
                                placeholder="Process De cription"
                                {...form.register(`process.${index}.processDescription`)}
                            />
                            {errorMessage.process?.[index]?.processDescription && (
                                <ErrorMessage>
                                    {errorMessage.process[index].processDescription.message}
                                </ErrorMessage>
                            )}

                            {fields.length > 1 && (
                            
                                <MdDelete onClick={() => remove(index)} className="text-2xl space-x-3 mb-5 cursor-pointer" />
                            )}
                        </div>

                    ))}
                    {
                        fields.length < 5 && (
                            <div>
                                <SecondaryButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        append({ processCount: 0, processTitle: '', processDescription: '' });
                                    }}
                                >
                                    Add List
                                </SecondaryButton>
                            </div>
                        )
                    }
                </section>
                <div className="pt-4 border-t flex justify-center">
                    <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                </div>
            </form>
        </div>
    )
}

