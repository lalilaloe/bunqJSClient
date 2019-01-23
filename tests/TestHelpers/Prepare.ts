export default () => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
	process.env.ENV_CI = "true";
	process.env.CI_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0jTNooQ0H3QIdDHoOj4u
7XEiYJaeG25dn2pN+OubnbNs7JN2YsNJF6L5R7V7C1B7rAX70WmwxWVbznPYJxDn
kqoI9M8pkZRnxLqx3y8ZF+f0qjIRuAr0mhT34NF+4k9JAgIxftQAeAtTtl9jZg62
GBTM3QHlevEAho/WSxf0zIuCh0QonLgMT/KWQ9WmRFzUgWnuQaML3qK+tRSjOA8q
qar2nv3wL82Kl0hBE3DLK9uQTZST3AmRweG5D0DYinaHfVd/tE9Us/GgKs3l9BYk
CPxJowrO39fUfl2cVl7O7DjjBBxS/KnrpwlVvdGL1RT9lL6u1LwnNkcW6V1VeePR
OwIDAQAB
-----END PUBLIC KEY-----`;
	process.env.CI_PRIVATE_KEY_PEM = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA0jTNooQ0H3QIdDHoOj4u7XEiYJaeG25dn2pN+OubnbNs7JN2
YsNJF6L5R7V7C1B7rAX70WmwxWVbznPYJxDnkqoI9M8pkZRnxLqx3y8ZF+f0qjIR
uAr0mhT34NF+4k9JAgIxftQAeAtTtl9jZg62GBTM3QHlevEAho/WSxf0zIuCh0Qo
nLgMT/KWQ9WmRFzUgWnuQaML3qK+tRSjOA8qqar2nv3wL82Kl0hBE3DLK9uQTZST
3AmRweG5D0DYinaHfVd/tE9Us/GgKs3l9BYkCPxJowrO39fUfl2cVl7O7DjjBBxS
/KnrpwlVvdGL1RT9lL6u1LwnNkcW6V1VeePROwIDAQABAoIBAQCvQGS8/Lm0C3pM
3Zr+i/916J+/pXM17YLSuL8/K7d2+DN03dCSsLvMoAxys6RdH4GsPuTeh95gBIxR
CJYKo/ZdebOz3s+KVw9YnkpTh6HFI5cBGnNZXJDnsVmkLyU5Kt70dL2tPrURYGgv
oUFuwg8g7p6KF92p7SoCBgOkYdmveZBpf/DVmRj/uNsYvPLx0AOPXXofD74PaEnT
IuncsO2EyIMuU6aXaEDK2zVob81HWZH94hBn3/sU3xRA/pwLSJLEA2Vfx3M3V8Au
8GIRXK/zlWXUmopovxD9bxaobXLToTt35XZRqDoKuvSiVzhtCURlCAJ1nuiXoizX
MA/GV/1xAoGBAPyQUvFiRWkwkUg/wv1qGcQ5ZFs3YIIDwkdR1ZVop5owWWUfKg2e
dkJ+apaHSgDLiqcrcjjOGA7k+bBh0Ln8ObZqlduHxlrVLvSdKoy4CdN4MYoDirf2
ZcdYNhKi2Cy/LlgQ6bqOhxBsFWn7npxnq+N9qMEaaR0NnylRc3x2spxjAoGBANUQ
8t0HdA3V9RzZrOfgKmczgmXWpuk7nzVcR85b6bYp7khJoQH8sPPed+QTQXvn+ZII
EdMYxiTuyOPfxwbaaukRkMpi7XFjbfK3DHyTs6mnv5FFeazeQm0x/55k0SznDn31
AalCXkRxi8F0Ihoh9vKB48srucElMJ/HPXiYtLNJAoGBANK4O2uHuS+9RMmJ4U77
cgoEdFWii1OOfU5x2Yhxq7x6cGttJ/H67uIlhRqYP8cQC1vUZNU+JlZu9mASDErQ
RPqMTQG/c2Afk7ClXHXRqukT1Ak5UUiRPHOohlzgHwqea7UwT0HGXqv18ZveQoRt
/ryr/9s1BNQnpE6d1YPXqMfPAoGAffnobrFCeA/CPk2hwvOyfpRhDA+PXqWG68jl
F+kWVUOThKAsF32trnMiFfMgq78ru6ET0Ol79khM9RbRmYa44ZcmMdOuKnWsg26h
bmLyPmRVivI2D/TV97QxPBjF6LOwyN59HfOEwxkTlc0xgJwGY7pS0kTHLqDrj/0A
pnY7mSkCgYEAmVLohAxHmHD64aSHbIL64seERVGvtnheSzRIeratgDnQRxKIiY3y
kMRfmisPkfDQcj9GMIHxEsAM/GA35WpCf/waxXSETQVVZz3IzM0H3FagqskPh2qK
mSDtx6TP6bhab9pkfc2vlryWMTEgFFtfMJX5T3F3A7sibKoalbPVitc=
-----END RSA PRIVATE KEY-----`;

	process.env.CI_SERVER_PRIVATE_KEY_PEM = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAzFDA/4F0+vZYt44hleIbSyji8VhwKhwVehKFEZWsbM3/AC8u
e6FWC0xgqmQNt+/HOVz86qEFAUKpc0GphrxL7AMvu6Cytp3JfwexQdAWjoU9zYdz
AcmOguPqmifnae+JDGpnW+WHyzz7aD27Nzb5N82Dj7PTHhm2T5sb5lo5K3UBRXuf
pzSAgmcz84OkphSoE7xJX9nck0vTLdDbReMVFs/lzMaqT7d1kFCdcZmy3f0N9ElT
SLbz+iOuhH/F3sLNifKdWCwpeJwi3QR/w77znMa/MHcIsFCScpemIDJn5LyjTOgY
9sbVeTw7F7/wM5BF2ndRCGIxkLkzFHeZJZp4SwIDAQABAoIBAQC1q2RAjDqY36y4
4b9JR3gfV2abVJi/SKNsHMWHgj+Dq5L+9fTt5uHcP/h/6WEtWR4bCmy0r6IEoeKL
4im77PfRDnBF9DiUGi7NLejV7RHxfdYbR0Hip/Z4ufGjSrIAxwVkLcRjuO8KrtmY
sbMjAFWO4cUGZM3mqNQram7fXwAQe2u/K9j/KN0yLb0f1TPNUeMN9YvodDrzRty7
igldUp1GFdKez7s05S07QYBtII/2PMjSv240RuEoaf3WUBslpGL2/QKhReo/vUOq
X4DI5xDMW6yag6U+kG86+RycoFmOIs+GYa++ggGzGLmLXCeVk2XClUvTXq7/J3BZ
eT3rpG3pAoGBAPsP65606DshxU1iz44EGiEghZn//YDO+MppYj2uLYRpNhaIBSCE
t9x1ybXJ27V+SOCPnYVGD6W2mpfD+/NROuPbGecjAXLbhydp0/G78hatpE/1Teej
ywwQ3G3Z55SLbAPrTlYExy6mieq7o2K6tOsSgqzO5a9aMMIo1Yvt2sQ9AoGBANBV
d5PF7HbiH8nWDl934XnYl9Sh6SCiIjEJiExU4rpnvtcrQ/8B3wOGYi4LGe2v2Tlk
lQbRq4DtpkIP+TRZXn3rEUU4S/eIPR/ulk600cD99q3ih0ms7uYq3ly3dGfWo96E
rKEfMjPLEpcxq8S3efUwvE6Jzs7CZijOzqPYUw8nAoGBAN6UcLoVfMXf3MIM1iH7
9QZlhMzRLPgjhmI9J8GzR9taQ3+aO6FmyHKFYrzuJwEy4n1kFazwPjMWPtxJ/nbr
DyCvQLmwSTqA8cO5iROJIsmETGYu/lBc4EjkMeiaBTuml66p0JtmRQhQ0XjvvZxs
FrVJhdya2PqrJQsdlKUnzImpAoGAVNDGyuGEQG4U1P4RgepzYEC+p3F3ULLRSrd/
xtu0JoGAH2dc2l+vpGa8Z9RbLPovbH83cLxBn06hJjoMkbRklMzzjgO6Yb8Ua4Cd
rtNMpc5+9BHKVENUS15egs6pVHD86+WFxl7F+HIPUoCFVqP/wcOiljLigCiCoNB5
Lhkuz3cCgYAqOjdWkFNagemO6Hhjjnjpq8R1aZEWUfXIEWOJsd7Nm/LIkqlhRvte
/QgXnduz8hbOrszd5qSCLltf5nNMfLpxMXI8PVJZdqKaOII0l5JOyiFZXGFGk6CV
sW/Ih/0bt7WP0/BOGdlBJWWnutDDo+b8bSHF/2isW1020H7KLBU/3w==
-----END RSA PRIVATE KEY-----`;
	//     process.env.CI_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
	// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLnbVFMMx/EYORBz8FTkpCu7io
	// GGW1LUPPCeRKh9tuiI77RXzvXENdZEQsgz504W1Z8KzgwVrMr5rNy6/Gm/SVKB+W
	// Y/19zgS2AwiVqX9+3zp7aqYT6FS6FChOnWY72/PsyTue12UipoSjJTiNbwDnvPkd
	// b54KP6JJSRgXd1yDVwIDAQAB
	// -----END PUBLIC KEY-----`;
	//     process.env.CI_PRIVATE_KEY_PEM = `-----BEGIN RSA PRIVATE KEY-----
	// MIICXQIBAAKBgQCLnbVFMMx/EYORBz8FTkpCu7ioGGW1LUPPCeRKh9tuiI77RXzv
	// XENdZEQsgz504W1Z8KzgwVrMr5rNy6/Gm/SVKB+WY/19zgS2AwiVqX9+3zp7aqYT
	// 6FS6FChOnWY72/PsyTue12UipoSjJTiNbwDnvPkdb54KP6JJSRgXd1yDVwIDAQAB
	// AoGAJYLR2S0rRFioSKbxv7MxMIzPKBql+O+YcF/v/jZSNnhqMgiRcJ4RW149EtiQ
	// R0bp4mhPinNoueXUacZ4C5yLMb5QL1WFiw0TO/s5q+cjMonqmTc68iIGsHzOPoAD
	// xzr4fbd9A3qPCawH3LIrjvTKsSrPZpWxPtiNa6Ix34J2dkECQQD62N3p5j4W8IiZ
	// SSYLH4llMPs1HHaLYfA6j/mzG4uekaV8w04KG5JxqfkYAy9FG3HrsSvY8jwKIgUx
	// 68OV1MxVAkEAjnvoqbUTA4UZi9xo+ig4vw0Pl/4Fnx4FAFhQDjLbD3H4cLggigXs
	// 3I1Omg6etgbe/65G4vkz1qVO6btdeMN8+wJANlj8I2wN8bxlbAiMJIbNps3o70Xe
	// bS5n9NgyulpycoWNvC04YDo/DT9NR6WQ/UEH+o+lN1isJ2ndhEZXVsQHDQJBAIR6
	// BLs1lrYhHL2Dcz+UAh7wf90r3AIzoSbO9bAd7LuRlhMHv4lVNQNjhv+KNFq+TLyh
	// R1tlpKMgFB0RjjjoWd0CQQDS+JYT6w36tKMlofEtsLvlou8h+SvlArDt+iMsl7+d
	// OuCxX3RBgdrZWtbREr4rCyNeKxjGezKHuCI/gXaVVJju
	// -----END RSA PRIVATE KEY-----`;
};
