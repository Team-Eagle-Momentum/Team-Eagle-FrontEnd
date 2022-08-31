# COMMUTILATOR BRANDING AND STYLE GUIDE

## Branding

### Colors:
**lilack**: #CED3F5\
**aqua**: #99F0E0\
**purple**: #9191CC\
**orange**: #F0B199\
**yellow**: #ECF3B1\
**gray**: #B9B9B9 (used for shadows and lines)

### Dark Mode
**darkest**: #2B282B\
**darker**: #3D383D\
**dark**: #4F494F\
**background**: #191719\
**highlight**: #A456F0

### Fonts and Sizes:
**title**: Source Code Pro, 700, xxlarge\
**subtitle and buttons**: Source Code Pro, 500, medium\
**description**: Palanquin, 400, large\
**steps**: Palanquin, 600, medium\
**fields**: Palanquin, 400, medium\
**costs**: Palanquin, 500, large\
**footer**: Source Code Pro, 200, small

## Styles

### Forms:
    <Stack
        align='center'
        bg='brand.yellow'
        borderRadius='lg'
        shadow='md'>
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
            bg='white'
            id=' '
            onChange={(e) =>
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