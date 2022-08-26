# COMMUTILATOR BRANDING AND STYLE GUIDE

## Branding

### Colors:
**lightBlue**: #C1F1F1\
**aqua**: #99F0E0\
**purple**: #CED3F5\
**orange**: #F0B199\
**yellow**: #ECF3B1\
**gray**: #B9B9B9 (used for shadows and lines)

### Fonts and Sizes:
**title**: Source Code Pro, 700, xxlarge\
**subtitle and buttons**: Source Code Pro, 500, medium\
**description**: Palanquin, 400, large\
**steps**: Palanquin, 500, medium\
**fields**: Palanquin, 300, medium\
**footer**: Source Code Pro, 200, small

## Styles

### Forms:
    <Stack
        align='center'
        bg='brand.yellow'
        borderRadius='lg'
        shadow='base'>
        <Text
            className='description' 
            textShadow='0.5px 0.5px #B9B9B9'
            mt='15px'>
            Form Title
        </Text>
    </Stack>

### Inputs:
    <Box mt='5px'>
        <Text htmlFor=''>
            Field Title: 
            </Text>
        <Input
            id=' '
            onChange={(e) =>
            bg='white'
            shadow='sm'
            type='text'>
        </Input>
    </Box>

### Buttons:
    <Button
        bg='brand.aqua'
        className='subtitle'
        colorScheme='black'>
        mt='25px'
        shadow='md'
        type=' '
        value=' '
        variant='outline'>
        Button
    </Button>