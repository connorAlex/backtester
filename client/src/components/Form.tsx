import { UseFormReturnType, useForm } from '@mantine/form'
import { Box, Button, Group, TextInput, Checkbox, NumberInput } from '@mantine/core'
import { DatePicker, DatePickerInput } from '@mantine/dates'

const Form = () => {
    const postURL = 'http://localhost:8080'

    const form = useForm({
        initialValues: {
            stocksTicker: 'AAPL',
            multiplier: 120,
            timespan: 'day',
            from: new Date("01/09/2022"),
            to: new Date("01/09/2023"),
            adjusted: true,
            sort: 'asc',
            limit: 120,
            movingAverageDays: 30,
        },

        transformValues: (values) => ({
            stocksTicker: values.stocksTicker,
            multiplier: values.multiplier,
            timespan: values.timespan,
            from: values.from.toISOString().slice(0, 10),
            to: values.to.toISOString().slice(0,10),
            adjusted: values.adjusted,
            sort: values.sort,
            limit: values.limit,
            movingAverageDays: values.movingAverageDays,
        }),
    });

    const sendForm = async (data: any) => {
        
        console.log(JSON.stringify(data));
        const response = await fetch(postURL, {
            method: "POST",
            mode: "cors",
            headers:{
                "Content-Type": "application/json",
            },
            cache: "default",
            body: JSON.stringify(data),
        });

        return response.json();
    }

    return ( 
        <Box mx="auto">
            <form onSubmit={form.onSubmit((values) => sendForm(values))}>
                <TextInput
                    withAsterisk
                    label="Stock Ticker"
                    placeholder='AAPL'
                    {...form.getInputProps('stocksTicker')}
                />
                
                <NumberInput
                    withAsterisk
                    label="multiplier"
                    placeholder='0'
                    {...form.getInputProps('multiplier')}
                />

                <Group>
                    <DatePickerInput
                        label="from"
                        mx="auto"
                        maw={400}
                        valueFormat='YYYY-MM-DD'
                        {...form.getInputProps("from")}
                    />
                    <DatePickerInput
                        label="to"
                        mx="auto"
                        maw={400}
                        valueFormat='YYYY-MM-DD'
                        {...form.getInputProps("to")}
                    />
                </Group>

                <TextInput
                    withAsterisk
                    label="Time Span"
                    placeholder=''
                    {...form.getInputProps('timespan')}
                />
                <TextInput
                    withAsterisk
                    label="Sort (asc | desc)"
                    {...form.getInputProps('sort')}
                />

                <NumberInput
                    withAsterisk
                    label="limit"
                    placeholder='0'
                    {...form.getInputProps('multiplier')}
                />
                <NumberInput
                    withAsterisk
                    label="Moving Average Days"
                    placeholder='0'
                    {...form.getInputProps('movingAverageDays')}
                />

                <Checkbox
                    mt="md"
                    label="adjusted"
                    {...form.getInputProps('adjusted', {type: 'checkbox'})}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>

            </form>
        </Box>
    )
}

export default Form