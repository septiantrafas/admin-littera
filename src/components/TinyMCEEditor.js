import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Textarea } from '@windmill/react-ui'
function TiniMCEEDitor() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState({ a: '', b: '', c: '', d: '' })

  return (
    <div className="my-4">
      <Editor
        key="question"
        onEditorChange={(newValue, editor) => {
          setQuestion(editor.getContent())
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
          content_css: 'dark',

          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resize:vertical ; ',
        }}
      />
    </div>
  )
}

export default TiniMCEEDitor
