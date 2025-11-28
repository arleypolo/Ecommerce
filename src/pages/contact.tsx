import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { contactFormSchema } from '@/utils/validationSchemas';
import { ContactFormData } from '@/types';
import { Mail, Send } from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation('common');

  const initialValues: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const handleSubmit = async (
    values: ContactFormData,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await axios.post('/api/contact', values);
      toast.success('✅ ' + t('contact.success'));
      resetForm();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('❌ ' + t('contact.error'));
    } finally {
      setSubmitting(false);
    }
  };    return (
        <>
            <Head>
                <title>E-Commerce - {t('common.contact')}</title>
                <meta name="description" content="Contáctanos para cualquier pregunta o consulta" />
            </Head>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary-100 p-4 rounded-full">
                            <Mail className="h-12 w-12 text-primary-600" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {t('contact.title')}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <Card className="p-8">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={contactFormSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-6">
                                <div>
                                    <Field name="name">
                                        {({ field }: any) => (
                                            <Input
                                                {...field}
                                                label={t('contact.name')}
                                                placeholder={t('contact.namePlaceholder')}
                                                error={touched.name && errors.name ? t(errors.name) : undefined}
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <Field name="email">
                                        {({ field }: any) => (
                                            <Input
                                                {...field}
                                                type="email"
                                                label={t('contact.email')}
                                                placeholder={t('contact.emailPlaceholder')}
                                                error={touched.email && errors.email ? t(errors.email) : undefined}
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <Field name="subject">
                                        {({ field }: any) => (
                                            <Input
                                                {...field}
                                                label={t('contact.subject')}
                                                placeholder={t('contact.subjectPlaceholder')}
                                                error={touched.subject && errors.subject ? t(errors.subject) : undefined}
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <Field name="message">
                                        {({ field }: any) => (
                                            <Textarea
                                                {...field}
                                                label={t('contact.message')}
                                                placeholder={t('contact.messagePlaceholder')}
                                                error={touched.message && errors.message ? t(errors.message) : undefined}
                                                rows={6}
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    <Send className="h-5 w-5 mr-2" />
                                    {isSubmitting ? t('contact.sending') : t('contact.send')}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Card>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center">
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-gray-600 text-sm">info@ecommerce.com</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <h3 className="font-semibold mb-2">Teléfono</h3>
                        <p className="text-gray-600 text-sm">+1 234 567 890</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <h3 className="font-semibold mb-2">Horario</h3>
                        <p className="text-gray-600 text-sm">Lun - Vie: 9:00 - 18:00</p>
                    </Card>
                </div>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'es', ['common'])),
        },
    };
};
