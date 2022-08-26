# COMMUTILATOR STYLE GUIDE AND BRANDING

## Branding

### Colors:
**lightBlue**: #C1F1F1\
**aqua**: #99F0E0\
**purple**: #CED3F5\
**orange**: #F0B199\
**yellow**: #ECF3B1\
**gray**: #B9B9B9\

### Fonts and Sizes:
**title**: Source Code Pro, 700, xxlarge
**subtitle and buttons**: Source Code Pro, 500, medium
**description**: Palanquin, 400, large
steps: Palanquin, 500, medium
form: Palanquin, 300, medium
footer: Source Code Pro, 200, small

## Styles

### Buttons:
            <Button
              type='submit'
              value='Log In'
              className='subtitle'
              shadow='md'
              mt='25px'
              bg='brand.aqua'
              variant='outline'
              colorScheme='black'>
              Log In
            </Button>

### Forms:
<Stack

              <Input
                id='username-field'
                onChange={(e) => setUsername(e.target.value)}
                type='text'
                shadow='sm'
                bg='white'>
              </Input>

            <Stack
                        bg='brand.yellow'
          align='center'
          w='400px'
          h='300px'
          borderRadius='lg'
          shadow='base'>

           <Text mt='15px' className='description' textShadow='0.5px 0.5px #b9b9b9'>Login</Text>