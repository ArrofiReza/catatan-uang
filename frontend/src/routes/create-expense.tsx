import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
// import type { FieldApi } from '@tanstack/react-form'
import { api } from '@/lib/api'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense
})

function CreateExpense() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const res = await api.expenses.$post({json: value})
      if(!res.ok){
        throw new Error("Server Error")
      }
      navigate({to:'/expenses'})
      // console.log(value)
    },
  })

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form
        className='max-w-3xl m-auto'
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title :</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
              {field.state.meta.isValidating ? 'Validating...' : null}
            </>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount :</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='number'
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
              {field.state.meta.isValidating ? 'Validating...' : null}
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              className="mt-4" 
              type="submit"
              disabled={!canSubmit}
              >
                {isSubmitting ? '...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
      {/* <form className='max-w-3xl m-auto' action="">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Title" />
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" placeholder="Amount" />
      </form> */}
    </div>
  )
}