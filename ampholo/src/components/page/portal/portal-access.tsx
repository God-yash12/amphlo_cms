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


export const PortalAccessProcess = () => {
    const { form, onSubmit, fields, append, remove, isLoading, isPending } = PortalAccessService()

    if (isLoading) return <PropagateLoader className="text-center" />


    return (
        <div className="p-6  bg-white rounded-lg shadow-md">
            <div className="text-center mb-6">
                <Header className="text-2xl font-bold text-gray-800">Portal Access Process</Header>
                <Paragraph className="text-gray-600">Customize the Portal Access Process section.</Paragraph>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <InputField
                        label="Title *"
                        placeholder="Title of Portal Access Porcess"
                        size="lg"
                        {...form.register("title")}
                        aria-invalid={form.formState.errors.title ? "true" : "false"}
                    />
                    {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}

                </div>
                <div className="w-auto space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Feature Description *
                    </label>
                    <TextEditor
                        value={form.watch("description") ?? ""}
                        onChange={(content) => {
                            form.setValue("description", content);
                        }}
                    />
                </div>

                {/* List Item Process */}
                <section className="space-y-5">
                    <Header>Add Portal Access Process</Header>
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-5">
                            <InputField
                                type="number"
                                label="Process Count"
                                placeholder="Process Count"
                                {...form.register(`process.${index}.processCount`, { valueAsNumber: true })}
                            />
                            {form.formState.errors.process?.[index]?.processCount && (
                                <ErrorMessage>
                                    {form.formState.errors.process[index].processCount.message}
                                </ErrorMessage>
                            )}

                            <InputField
                                label="Process Title"
                                placeholder="Process Title"
                                {...form.register(`process.${index}.processTitle`)}
                            />
                            {form.formState.errors.process?.[index]?.processTitle && (
                                <ErrorMessage>
                                    {form.formState.errors.process[index].processTitle.message}
                                </ErrorMessage>
                            )}

                            {/* @ts-ignore */}
                            <Textarea
                                label="Process Description"
                                placeholder="Process De cription"
                                {...form.register(`process.${index}.processDescription`)}
                            />
                            {form.formState.errors.process?.[index]?.processDescription && (
                                <ErrorMessage>
                                    {form.formState.errors.process[index].processDescription.message}
                                </ErrorMessage>
                            )}

                            {fields.length > 1 && (
                                <SecondaryButton onClick={() => remove(index)} className="text-sm space-x-3 cursor-pointer"> Delete </SecondaryButton>
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


                <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
            </form>
        </div>
    )
}

