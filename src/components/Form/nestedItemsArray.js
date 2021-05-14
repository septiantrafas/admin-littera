import React, { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { Label, Button } from '@windmill/react-ui'
import { Editor } from '@tinymce/tinymce-react'

function numberToLetter(number) {
  return (number + 9).toString(36).toUpperCase()
}

export default ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `items[${nestIndex}].options`,
  })
  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <Label>
              <div className="flex justify-between my-4">
                <div className="align-middle">
                  <span className="mb-4">Options {numberToLetter(k + 1)}</span>
                </div>
                <Button
                  layout="outline"
                  size="small"
                  type="button"
                  onClick={() => remove(k)}
                >
                  x
                </Button>
              </div>

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
                {...register(`items[${nestIndex}].options[${k}].option`, {
                  required: true,
                })}
                defaultValue={item.options}
                value={inputValue}
                style={{ marginRight: '25px' }}
              />
            </Label>
          </div>
        )
      })}
      <div className="flex justify-center my-4">
        <Button
          className="mr-4"
          type="button"
          size="small"
          onClick={() =>
            append({
              option: 'option',
            })
          }
        >
          + question
        </Button>
      </div>
    </div>
  )
}
