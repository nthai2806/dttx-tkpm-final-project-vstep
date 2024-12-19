import type { Schema, Struct } from '@strapi/strapi';

export interface VstepB2ExamVstepB2ExamConfig extends Struct.ComponentSchema {
  collectionName: 'components_vstep_b2_exam_vstep_b2_exam_configs';
  info: {
    displayName: 'Vstep B2 Exam Config';
  };
  attributes: {
    listeningTimebox: Schema.Attribute.Integer;
    readingTimebox: Schema.Attribute.Integer;
    speakingTimebox: Schema.Attribute.Integer;
    writingTimebox: Schema.Attribute.Integer;
  };
}

export interface VstepB2ExamVstepB2ExamListening
  extends Struct.ComponentSchema {
  collectionName: 'components_vstep_b2_exam_vstep_b2_exam_listenings';
  info: {
    description: '';
    displayName: 'VSTEP B2 Exam - Listening';
  };
  attributes: {
    audio: Schema.Attribute.Media<'files' | 'audios'>;
    audioScript: Schema.Attribute.Text;
    questions: Schema.Attribute.Component<
      'vstep-b2-exam.vstep-b2-exam-question',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface VstepB2ExamVstepB2ExamListeningPart
  extends Struct.ComponentSchema {
  collectionName: 'components_vstep_b2_exam_vstep_b2_exam_listening_parts';
  info: {
    description: '';
    displayName: 'VSTEP B2 Exam - Listening Part';
  };
  attributes: {
    listenings: Schema.Attribute.Component<
      'vstep-b2-exam.vstep-b2-exam-listening',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VstepB2ExamVstepB2ExamQuestion extends Struct.ComponentSchema {
  collectionName: 'components_vstep_b2_exam_vstep_b2_exam_questions';
  info: {
    description: '';
    displayName: 'VSTEP B2 Exam - Question';
  };
  attributes: {
    a: Schema.Attribute.String;
    b: Schema.Attribute.String;
    c: Schema.Attribute.String;
    content: Schema.Attribute.Text;
    d: Schema.Attribute.String;
    result: Schema.Attribute.Enumeration<['a', 'b', 'c', 'd']> &
      Schema.Attribute.Required;
  };
}

export interface VstepB2ExamVstepB2ExamReading extends Struct.ComponentSchema {
  collectionName: 'components_vstep_b2_exam_vstep_b2_exam_readings';
  info: {
    description: '';
    displayName: 'VSTEP B2 Exam - Reading';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjU0OTc1OTksImp0aSI6ImE0ZDYxMzM1LTdiMTQtNDk0OS1hZWYxLTgwYTliNDVlYTQzYSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkJPWCJdLCJ2YyI6ImM2MWJiOGNiIn0.rRykXBvxKhlbz9LU8XMgLrKOhFBDd4rCtBsqz2hXfZ-MHuLdnrXaDD71Kc24wPYr8S9q9pKUyU7Mn00CX7J9Tg';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    questions: Schema.Attribute.Component<
      'vstep-b2-exam.vstep-b2-exam-question',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VstepB2ExamVstepB2ExamSpeaking extends Struct.ComponentSchema {
  collectionName: 'components_vstep_b2_exam_vstep_b2_exam_speakings';
  info: {
    description: '';
    displayName: 'VSTEP B2 Exam - Speaking';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjU0OTc1OTksImp0aSI6ImE0ZDYxMzM1LTdiMTQtNDk0OS1hZWYxLTgwYTliNDVlYTQzYSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkJPWCJdLCJ2YyI6ImM2MWJiOGNiIn0.rRykXBvxKhlbz9LU8XMgLrKOhFBDd4rCtBsqz2hXfZ-MHuLdnrXaDD71Kc24wPYr8S9q9pKUyU7Mn00CX7J9Tg';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VstepB2ExamVstepB2ExamWriting extends Struct.ComponentSchema {
  collectionName: 'components_vstep_b2_exam_vstep_b2_exam_writings';
  info: {
    description: '';
    displayName: 'VSTEP B2 Exam - Writing';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjU0OTc1OTksImp0aSI6ImE0ZDYxMzM1LTdiMTQtNDk0OS1hZWYxLTgwYTliNDVlYTQzYSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkJPWCJdLCJ2YyI6ImM2MWJiOGNiIn0.rRykXBvxKhlbz9LU8XMgLrKOhFBDd4rCtBsqz2hXfZ-MHuLdnrXaDD71Kc24wPYr8S9q9pKUyU7Mn00CX7J9Tg';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'vstep-b2-exam.vstep-b2-exam-config': VstepB2ExamVstepB2ExamConfig;
      'vstep-b2-exam.vstep-b2-exam-listening': VstepB2ExamVstepB2ExamListening;
      'vstep-b2-exam.vstep-b2-exam-listening-part': VstepB2ExamVstepB2ExamListeningPart;
      'vstep-b2-exam.vstep-b2-exam-question': VstepB2ExamVstepB2ExamQuestion;
      'vstep-b2-exam.vstep-b2-exam-reading': VstepB2ExamVstepB2ExamReading;
      'vstep-b2-exam.vstep-b2-exam-speaking': VstepB2ExamVstepB2ExamSpeaking;
      'vstep-b2-exam.vstep-b2-exam-writing': VstepB2ExamVstepB2ExamWriting;
    }
  }
}
