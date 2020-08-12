describe('EcommerceApp', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('AppFlow', async () => {
    await element(by.id('mobile_category')).tap();
    await expect(element(by.id('cat_list'))).toBeVisible();
    await element(by.id('4404')).tap();
    await element(by.id('addtocart')).tap();
    await element(by.id('cartview')).tap();
    await element(by.id('goback')).tap();
    await element(by.id('gobackfromheader')).tap();
    await element(by.id('gobackfromheader')).tap();
    
    await element(by.id('moretab')).tap();
    await element(by.id('login')).tap();
    await expect(element(by.id('username'))).toBeVisible();
    await element(by.id('username')).replaceText('arunramya151@gmail.com')
    await expect(element(by.id('password'))).toBeVisible();
    await element(by.id('password')).replaceText('12345')
    await element(by.id("homebutton")).tap();
    
    await waitFor(element(by.id('EMERGING MODELS'))).toBeVisible().whileElement(by.id('homescroll')).scroll(200);
    await element(by.id("EMERGING MODELS")).tap();
    await element(by.id("4698")).tap();
    await element(by.id("buynow")).tap();
    await element(by.id('goback')).tap(); 
    await element(by.id('gobackfromheader')).tap();
    await element(by.id('gobackfromheader')).tap();

    await element(by.id('moretab')).tap();
    await element(by.id('account')).tap();
    await element(by.id('passwordchange')).tap();
    await element(by.id('newPassword')).replaceText('12345')
    await element(by.id('reenterPassword')).replaceText('12345')
    await waitFor(element(by.id('change'))).toBeVisible().whileElement(by.id('passscroll')).scroll(200);

    await element(by.id('change')).tap();
    await element(by.id('change')).tap();
    await element(by.id('moretab')).tap();
    await element(by.id('account')).tap()
    await element(by.id("address")).tap()
    await element(by.id('lakshmi')).tap();
    await expect(element(by.id('firstname'))).toBeVisible();
    await element(by.id('firstname')).replaceText('lakshmi')
    await element(by.id('continue')).tap();
    await element(by.id('addnewaddress')).tap();
    await expect(element(by.id('firstname'))).toBeVisible();
    await element(by.id('firstname')).replaceText('lakshmi')
    await expect(element(by.id('lastname'))).toBeVisible();
    await element(by.id('lastname')).replaceText('L')
    await expect(element(by.id('phonenumber'))).toBeVisible();
    await element(by.id('phonenumber')).replaceText('1234567890')
    await expect(element(by.id('address1'))).toBeVisible();
    await element(by.id('address1')).replaceText('11,anna nagar')

    await element(by.id('address2')).replaceText('example')
    await expect(element(by.id('city'))).toBeVisible();
    await element(by.id('city')).replaceText('chennai')
    
     await waitFor(element(by.id('pincode'))).toBeVisible().whileElement(by.id('addressscroll')).scroll(200);
     await expect(element(by.id('pincode'))).toBeVisible();
     await element(by.id('pincode')).replaceText('123456')
     
    
     await element(by.id('goback')).tap();
     await element(by.id('goback')).tap();
     await element(by.id('moretab')).tap();
     await element(by.id('myorder')).tap();
     await element(by.id('goback')).tap();
     await element(by.id('logout')).tap();
     await element(by.id('login')).tap();
     
     await element(by.id('username')).replaceText('arunramya151@gmail.com')
     await expect(element(by.id('password'))).toBeVisible();
     await element(by.id('password')).replaceText('arun@1238188')
     await element(by.id('register')).tap();
    await expect(element(by.id('name'))).toBeVisible();
    await element(by.id('name')).replaceText('sri')
    await expect(element(by.id('email'))).toBeVisible();
    await element(by.id('email')).replaceText('sri@gmail.com@8188')
    await expect(element(by.id('mobileno'))).toBeVisible();
    await element(by.id('mobileno')).replaceText('989898989') 
    await element(by.id('goback')).tap();
    await element(by.id('forgotPassword')).tap();
    await expect(element(by.id('newPassword'))).toBeVisible();
    await element(by.id('newPassword')).replaceText('12345')
    await expect(element(by.id('reenterPassword'))).toBeVisible();
    await element(by.id('reenterPassword')).replaceText('123')
    await element(by.id('forgotclicked')).tap();
    await element(by.id('goback')).tap();
    await element(by.id('goback')).tap();

    // await element(by.id('https://apps2.poorvikamobile.com/image/data/AAAAA/ONEPLUS/ONEPLUS-8Pro/oneplus-8-pro-glacial-green-128gb-8gb-ram-pre-book-4698.webp')).tap();
    // await element(by.id('close')).tap();
    //await waitFor(element(by.id('favbutton'))).toBeVisible().whileElement(by.id('productscroll')).scroll(100);
    // await element(by.id('productscroll')).scroll(150);
    // await element(by.id("favbutton")).tap();
    
    //await expect(element(by.id('loginview'))).toBeVisible();
  })
});
