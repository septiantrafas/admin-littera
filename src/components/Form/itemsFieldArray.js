import React, { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import NestedArray from './nestedItemsArray'
import { Label, Button } from '@windmill/react-ui'
import { Editor } from '@tinymce/tinymce-react'

let renderCount = 0
export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'items',
  })
  const [inputValue, setInputValue] = useState('')

  renderCount++

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <Label>
                <span className="mb-4">Question</span>
                <Editor
                  key={item.id}
                  apiKey="awlfaezu5y4xg5bp5dpcfy1vmmop4jjhw73t36hys3why589"
                  onEditorChange={(newValue, editor) => {
                    setInputValue(editor.getContent())
                  }}
                  init={{
                    height: 500,
                    menubar: false,
                    external_plugins: {
                      tiny_mce_wiris:
                        'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
                    },
                    plugins:
                      'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                    imagetools_cors_hosts: ['picsum.photos'],
                    menubar: 'file edit view insert format tools table help',
                    toolbar:
                      'undo redo | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    toolbar_sticky: true,
                    skin: 'oxide-dark',

                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resize:vertical ; ',
                  }}
                />
                <input
                  {...register(`items.${index}.question`)}
                  defaultValue={item.name}
                  value={inputValue}
                />
              </Label>
              <NestedArray nestIndex={index} {...{ control, register }} />
              {/* <div className="flex justify-end">
                <Button type="button" onClick={() => remove(index)}>
                  Delete
                </Button>
              </div> */}
            </li>
          )
        })}
      </ul>
      {/* 
      <section>
        <Button
          type="button"
          onClick={() => {
            append({ name: 'append' })
          }}
        >
          append Q&A
        </Button>
      </section> */}
    </>
  )
}
