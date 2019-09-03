import { strings } from '@angular-devkit/core';
import { apply, mergeWith, move, Rule, SchematicContext, SchematicsException, template, Tree, url } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';

export function hello(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const workspaceConfigBuffer = tree.read('angular.json');
        if (!workspaceConfigBuffer) {
            throw new SchematicsException('Not and Angular CLI workspace');
        }

        const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
        const projectName = _options.project || workspaceConfig.defaultProject;
        const project = workspaceConfig.projects[projectName];

        const defaultProjectPath = buildDefaultPath(project);

        const parsedPath = parseName(defaultProjectPath, _options.name);
        const { name, path } = parsedPath;

        const sourceTemplates = url('./files');
        const sourceParametrizedTempalates = apply(sourceTemplates, [
            template({
                ..._options,
                ...strings,
                name
            }),
            move(path)
        ]);
        return mergeWith(sourceParametrizedTempalates)(tree, _context);
    };
}
