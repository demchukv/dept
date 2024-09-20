export const dynamic = 'force-static';

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  const vars = {
    message: 'Ok',
    second: 'second',
    username: username,
    data: {
      seccess_key: 1,
      message: 'Ok',
      sid: 'skdjfhsdkjfh9asd8fhsdajkfbskdaj',
      username: username,
      email: 'email@gmail.com',
      access_token:
        'sfhvsadgfu0sd8kjnvfdkxndfjvg;l;ksdg;kdsfgkldsfgjkdfhsgjdhfs;klhdf;lsk',
      refresh_token:
        'kfjvfkdjsfgkldsf dsfhgkdjsfhgdkfshglk;dfhgkldsfdhfjkghdfkljhdfjksl',
      expires_on: '2025-01-01 00:00:00',
    },
  };

  return Response.json({ vars });
}
