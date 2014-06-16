#!/bin/bash
trap "echo terminated.; exit;" SIGINT SIGTERM
#
# This simple bash file helps comparing 2 releases in order to identify
# files to add/remove from layer definitions.
#
# first update variables and/or svn export accordingly to the target versions you want to compare,
# then run this file to generate both added.lst and removed.lst files. Finally, manually update your layer definitions.
#
ROOT_DIR=compare_result

echo "sources will be extracted in current directory, under ${ROOT_DIR}"
read -p "Press a key to continue..." -n 1


OLD_RELEASE=1.9.3
OLD_APP_BRANCH=dojo19
OLD_CALENDAR_BRANCH=dojo1.9
OLD_DGAUGE_BRANCH=dojo1.9
OLD_GRIDX_TAG=1.2.1
mkdir -p ${ROOT_DIR}/${OLD_RELEASE}
cd  ${ROOT_DIR}/${OLD_RELEASE}
echo "extracting sources (${OLD_RELEASE}) from remote repository in `pwd` ..."
svn export https://github.com/dojo/dojo/tags/${OLD_RELEASE} dojo --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dojo/dijit/tags/${OLD_RELEASE} dijit --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dojo/dojox/tags/${OLD_RELEASE} dojox --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dmachi/dojox_application/branches/${OLD_APP_BRANCH} dojox/app --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/damiengarbarino/dojo-calendar/branches/${OLD_CALENDAR_BRANCH} dojox/calendar --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dmandrioli/dgauges/branches/${OLD_DGAUGE_BRANCH} dojox/dgauges --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dojo/util/tags/${OLD_RELEASE} util --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/oria/gridx/tags/${OLD_GRIDX_TAG} gridx --force --native-eol=LF > /dev/null 2>&1
echo "generating ${OLD_RELEASE}.lst ..."
find . -name "*.js" -not -path "*/nls/*" \
	-not -path "*/tests/*" \
	-not -path "*/test_*" \
	-exec echo -e "\t{}" \; | sed s/".\/"// | env LC_COLLATE=POSIX sort -f - > ../${OLD_RELEASE}.lst
cd ../..

NEW_RELEASE=1.10.0
NEW_APP_BRANCH=dojo1.10
NEW_CALENDAR_BRANCH=dojo1.10
NEW_DGAUGES_BRANCH=dojo1.10
NEW_GRIDX_TAG=v1.3.1
mkdir -p ${ROOT_DIR}/${NEW_RELEASE}
cd  ${ROOT_DIR}/${NEW_RELEASE}
echo "extracting sources (${NEW_RELEASE}) from remote repository in `pwd` ..."
svn export https://github.com/dojo/dojo/tags/${NEW_RELEASE} dojo --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dojo/dijit/tags/${NEW_RELEASE} dijit --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dojo/dojox/tags/${NEW_RELEASE} dojox --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dmachi/dojox_application/branches/${NEW_APP_BRANCH} dojox/app --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/damiengarbarino/dojo-calendar/branches/${NEW_CALENDAR_BRANCH} dojox/calendar --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dmandrioli/dgauges/branches/${NEW_DGAUGES_BRANCH} dojox/dgauges --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/dojo/util/tags/${NEW_RELEASE} util --force --native-eol=LF > /dev/null 2>&1
svn export https://github.com/oria/gridx/tags/${NEW_GRIDX_TAG} gridx --force --native-eol=LF > /dev/null 2>&1
echo "generating ${NEW_RELEASE}.lst ..."
find . -name "*.js" -not -path "*/nls/*" \
	-not -path "*/tests/*" \
	-not -path "*/test_*" \
	-exec echo -e "\t{}" \; | sed s/".\/"// | env LC_COLLATE=POSIX sort -f - > ../${NEW_RELEASE}.lst
cd ../..

echo "List of new files: ${ROOT_DIR}/added.lst ..."
diff -b \
	--ignore-blank-lines -b \
	--ignore-case \
	--old-line-format='' \
	--unchanged-line-format='' \
	${ROOT_DIR}/${OLD_RELEASE}.lst ${ROOT_DIR}/${NEW_RELEASE}.lst > ${ROOT_DIR}/added.lst

echo "List of removed files: ${ROOT_DIR}/removed.lst ..."
diff -b \
	--ignore-blank-lines -b \
	--ignore-case \
	--old-line-format='' \
	--unchanged-line-format='' \
	${ROOT_DIR}/${NEW_RELEASE}.lst ${ROOT_DIR}/${OLD_RELEASE}.lst > ${ROOT_DIR}/removed.lst

echo "done."
