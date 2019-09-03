import { <%= classify(name) %> } from './<%= name %>.ts';
import { storiesOf } from '@storybook/angular';

const story = storiesOf('<%= classify(name) %>', module);

story.add('Default', () => ({
    component: <%= classify(name) %>,
    props: {}
}));